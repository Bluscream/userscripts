// ==UserScript==
// @name         Steam Collection Manager
// @version      2.6.0
// @description  Adds buttons to collections related to the mass removal, addition, and sorting of items.
// @author       pointfeev
// @copyright    2021, pointfeev (https://github.com/pointfeev)
// @license      MIT
// @match        *://*.steamcommunity.com/sharedfiles/filedetails/?id=*
// @match        *://*.steamcommunity.com/workshop/filedetails/?id=*
// @match        *://*.steamcommunity.com/sharedfiles/managecollection/?id=*
// @match        *://*.steamcommunity.com/workshop/managecollection/?id=*
// @icon         https://steamcommunity.com/favicon.ico
// @grant        none
// @namespace    https://github.com/pointfeev
// @homepageURL  https://gist.github.com/pointfeev/31618a04ab2f754158ca7d950e1dd35c
// @updateURL    https://gist.githubusercontent.com/pointfeev/31618a04ab2f754158ca7d950e1dd35c/raw
// @downloadURL  https://gist.githubusercontent.com/pointfeev/31618a04ab2f754158ca7d950e1dd35c/raw
// ==/UserScript==

(function() {
    'use strict';

    if (document.querySelector("div#mainContentsCollection") == null && document.querySelector("div.manageCollectionItemsBody") == null) return;

    var collection_id = new URL(document.location.href).searchParams.get('id');
    var sessionID = window.g_sessionID;
    var steamID = window.g_steamID;

    var author = jQuery('a.friendBlockLinkOverlay').attr('href');
    var user = jQuery('a.user_avatar.playerAvatar').attr('href').slice(0, -1);
    if (author != null && author != user) return;

    var btn_cancel_offset = 0;
    var collection_window = document.querySelector('div.manageCollectionItems');
    var right_contents;
    if (collection_window != null)
    {
        btn_cancel_offset = 63;
        collection_window.style['min-height'] = '290px';
    }
    else
    {
        right_contents = document.querySelector("div#rightContents");
        if (right_contents != null)
        {
            btn_cancel_offset = 69;
            right_contents.style['padding-top'] = "330px";
        }
        else return;
    }

    function unix()
    {
        return new Date().getTime() / 1000;
    }

    var btn_cancel;
    var manage_document;
    var manage_document_unix;
    function get_manage_document(btn, func)
    {
        if (manage_document != null && unix() - manage_document_unix < 15) { func(); return; }
        manage_document_unix = unix();
        btn.html("Getting manage document . . .");
        if (window.location.pathname == "/sharedfiles/managecollection/")
        {
            manage_document = jQuery(document.documentElement);
            func();
        }
        else
        {
            jQuery.ajax({
                type: "GET",
                url: "https://steamcommunity.com/sharedfiles/managecollection",
                data: {
                    id: collection_id
                },
                success: function (response) {
                    if (btn_cancel == null) return;
                    manage_document = jQuery(jQuery.parseHTML(response));
                }
            }).done(func);
        }
    }

    function update_choice_item(childID, add)
    {
        var listItems = ["#choice_MyItems_" + childID, "#choice_MyFavoriteItems_" + childID, "#choice_MySubscribedItems_" + childID];
        for (var i = 0; i < listItems.length; ++i)
        {
            if (btn_cancel == null) return;
            var listElem = manage_document.find(listItems[i]);
            if (listElem)
            {
                if (add) listElem.addClass("inCollection");
                else listElem.removeClass("inCollection");
            }
        }
    }

    function start_working(btn)
    {
        var btn_dom = btn[0];
        btn_dom.style.right = (parseInt(btn_dom.style.right.replace('px', '')) + btn_cancel_offset) + 'px';

        if (btn_cancel != null)
        {
            btn_cancel.remove();
            btn_cancel = null;
        }
        btn_cancel = document.createElement('a');
        jQuery(btn_cancel).text('Cancel');
        jQuery(btn_cancel).addClass("sectionTab");
        btn_cancel.style.background = btn_dom.style.background;
        btn_cancel.style.color = 'black';
        btn_cancel.style['border-radius'] = '0px';
        btn_cancel.style.position = 'absolute';
        if (collection_window != null)
        {
            btn_cancel.style.top = btn_dom.style.top;
            btn_cancel.style.right = '5px';
            collection_window.insertBefore(btn_cancel, collection_window.firstChild);
        }
        else if (right_contents != null)
        {
            btn_cancel.style.top = btn_dom.style.top;
            btn_cancel.style.right = '0px';
            right_contents.insertBefore(btn_cancel, right_contents.firstChild);
        }
        jQuery(btn_cancel).click(function() {
            stop_working(btn);
            btn.text("Cancelling . . .");
            location.reload(true);
        });
    }

    function stop_working(btn)
    {
        var btn_dom = btn[0];
        btn_dom.style.right = (parseInt(btn_dom.style.right.replace('px', '')) - btn_cancel_offset) + 'px';

        if (btn_cancel != null)
        {
            btn_cancel.remove();
            btn_cancel = null;
        }
    }

    function remove_item(btn, choice_string)
    {
        if (btn_cancel != null) return;
        var btn_text = btn.text();
        start_working(btn);
        btn.text("Working . . .");
        get_manage_document(btn, function() {
            if (btn_cancel == null) return;
            var sortable_items = manage_document.find('div#sortable_items div.managedCollectionItem');
            if (sortable_items.length)
            {
                var i = 0;
                sortable_items.each(function() {
                    if (btn_cancel == null) return;
                    var item = jQuery(this);
                    var childID = item.attr('id').replace('sharedfile_', '');
                    if (choice_string != null && manage_document.find("#choice_" + choice_string + "_" + childID).length) return;
                    i++;
                    btn.text("Removing " + i + (i == 1 ? " item . . ." : " items . . ."));
                    jQuery.ajax({
                        type: "POST",
                        url: "https://steamcommunity.com/sharedfiles/removechild",
                        data: {
                            id: collection_id,
                            sessionid: sessionID,
                            childid: childID
                        },
                        success: function () {
                            if (btn_cancel == null) return;
                            item.remove();
                            update_choice_item(childID, false);
                        }
                    }).done(function() {
                        if (btn_cancel == null) return;
                        i--;
                        if (i == 0)
                        {
                            btn.text("Refreshing . . .");
                            location.reload();
                        }
                        else btn.text("Removing " + i + (i == 1 ? " item . . ." : " items . . ."));
                    });
                });
                if (btn_cancel == null) return;
                if (i == 0)
                {
                    stop_working(btn);
                    btn.text(btn_text);
                }
            }
            else
            {
                stop_working(btn);
                btn.text(btn_text);
            }
        });
    }

    function add_item(btn, choice_string)
    {
        if (btn_cancel != null) return;
        var btn_text = btn.text();
        start_working(btn);
        btn.text("Working . . .");
        get_manage_document(btn, function() {
            if (btn_cancel == null) return;
            var sortable_items = manage_document.find('div#' + choice_string + ' div.itemChoice:not(.inCollection)');
            if (sortable_items.length)
            {
                var i = 0;
                sortable_items.each(function() {
                    if (btn_cancel == null) return;
                    if (jQuery(this).find('div.itemChoiceType').text().trim() != "Item") return;
                    var childID = jQuery(this).attr('id').replace('choice_' + choice_string + '_', '');
                    i++;
                    btn.text("Adding " + i + (i == 1 ? " item . . ." : " items . . ."));
                    jQuery.ajax({
                        type: "POST",
                        url: "https://steamcommunity.com/sharedfiles/addchild",
                        data: {
                            id: collection_id,
                            sessionid: sessionID,
                            childid: childID
                        },
                        success: function () {
                            if (btn_cancel == null) return;
                            update_choice_item(childID, true);
                        }
                    }).done(function() {
                        if (btn_cancel == null) return;
                        i--;
                        if (i == 0)
                        {
                            btn.text("Refreshing . . .");
                            location.reload();
                        }
                        else btn.text("Adding " + i + (i == 1 ? " item . . ." : " items . . ."));
                    });
                });
                if (btn_cancel == null) return;
                if (i == 0)
                {
                    stop_working(btn);
                    btn.text(btn_text);
                }
            }
            else
            {
                stop_working(btn);
                btn.text(btn_text);
            }
        });
    }

    function sort(btn, sort_selector)
    {
        if (btn_cancel != null) return;
        var btn_text = btn.text();
        start_working(btn);
        btn.text("Working . . .");
        get_manage_document(btn, function() {
            if (btn_cancel == null) return;
            var items = manage_document.find('#sortable_items').find("div.managedCollectionItem");
            var n = 0;
            var i = items.length;
            items.sort((a, b) => jQuery(a).find(sort_selector).text().localeCompare(jQuery(b).find(sort_selector).text()));
            if (btn_cancel == null) return;
            items.each(function() {
                if (btn_cancel == null) return;
                if (jQuery(this).find('.sortorder_input').val() != items.length - i--) n++;
            });
            if (btn_cancel == null) return;
            if (n)
            {
                btn.text("Sorting " + n + (n == 1 ? " item . . ." : " items . . ."));

                i = items.length;
                items.each(function() {
                    if (btn_cancel == null) return;
                    jQuery(this).find('.sortorder_input').val(items.length - i--);
                });
                if (btn_cancel == null) return;

                jQuery.ajax({
                    type: "POST",
                    url: "https://steamcommunity.com/sharedfiles/setcollectionsortorder",
                    data: manage_document.find("#ChildItemsForm").serialize(),
                    success: function () {
                        if (btn_cancel == null) return;
                        btn.text("Refreshing . . .");
                        location.reload(true);
                    }
                });
            }
            else
            {
                stop_working(btn);
                btn.text(btn_text);
            }
        });
    }

    var btn_rem_published = document.createElement('a');
    jQuery(btn_rem_published).text('Remove all unowned items');
    jQuery(btn_rem_published).addClass("sectionTab");
    btn_rem_published.style.background = '#FF6666';
    btn_rem_published.style.color = 'black';
    btn_rem_published.style['border-radius'] = '0px';
    btn_rem_published.style.position = 'absolute';
    jQuery(btn_rem_published).click(function() { remove_item(jQuery(this), "MyItems"); });

    var btn_add_published = document.createElement('a');
    jQuery(btn_add_published).text('Add all owned items');
    jQuery(btn_add_published).addClass("sectionTab");
    btn_add_published.style.background = '#90EE90';
    btn_add_published.style.color = 'black';
    btn_add_published.style['border-radius'] = '0px';
    btn_add_published.style.position = 'absolute';
    jQuery(btn_add_published).click(function() { add_item(jQuery(this), "MyItems"); });

    var btn_rem_favorited = document.createElement('a');
    jQuery(btn_rem_favorited).text('Remove all unfavorited items');
    jQuery(btn_rem_favorited).addClass("sectionTab");
    btn_rem_favorited.style.background = '#FF6666';
    btn_rem_favorited.style.color = 'black';
    btn_rem_favorited.style['border-radius'] = '0px';
    btn_rem_favorited.style.position = 'absolute';
    jQuery(btn_rem_favorited).click(function() { remove_item(jQuery(this), "MyFavoriteItems"); });

    var btn_add_favorited = document.createElement('a');
    jQuery(btn_add_favorited).text('Add all favorited items');
    jQuery(btn_add_favorited).addClass("sectionTab");
    btn_add_favorited.style.background = '#90EE90';
    btn_add_favorited.style.color = 'black';
    btn_add_favorited.style['border-radius'] = '0px';
    btn_add_favorited.style.position = 'absolute';
    jQuery(btn_add_favorited).click(function() { add_item(jQuery(this), "MyFavoriteItems"); });

    var btn_rem_subscribed = document.createElement('a');
    jQuery(btn_rem_subscribed).text('Remove all unsubscribed items');
    jQuery(btn_rem_subscribed).addClass("sectionTab");
    btn_rem_subscribed.style.background = '#FF6666';
    btn_rem_subscribed.style.color = 'black';
    btn_rem_subscribed.style['border-radius'] = '0px';
    btn_rem_subscribed.style.position = 'absolute';
    jQuery(btn_rem_subscribed).click(function() { remove_item(jQuery(this), "MySubscribedItems"); });

    var btn_add_subscribed = document.createElement('a');
    jQuery(btn_add_subscribed).text('Add all subscribed items');
    jQuery(btn_add_subscribed).addClass("sectionTab");
    btn_add_subscribed.style.background = '#90EE90';
    btn_add_subscribed.style.color = 'black';
    btn_add_subscribed.style['border-radius'] = '0px';
    btn_add_subscribed.style.position = 'absolute';
    jQuery(btn_add_subscribed).click(function() { add_item(jQuery(this), "MySubscribedItems"); });

    var btn_rem_all = document.createElement('a');
    jQuery(btn_rem_all).text('Remove all items');
    jQuery(btn_rem_all).addClass("sectionTab");
    btn_rem_all.style.background = '#FF6666';
    btn_rem_all.style.color = 'black';
    btn_rem_all.style['border-radius'] = '0px';
    btn_rem_all.style.position = 'absolute';
    jQuery(btn_rem_all).click(function() { remove_item(jQuery(this)); });

    var btn_sort_name = document.createElement('a');
    jQuery(btn_sort_name).text('Sort items by name');
    jQuery(btn_sort_name).addClass("sectionTab");
    btn_sort_name.style.background = '#ADD8E6';
    btn_sort_name.style.color = 'black';
    btn_sort_name.style['border-radius'] = '0px';
    btn_sort_name.style.position = 'absolute';
    jQuery(btn_sort_name).click(function() { sort(jQuery(this), ".actual_title"); });

    var btn_sort_author = document.createElement('a');
    jQuery(btn_sort_author).text('Sort items by author');
    jQuery(btn_sort_author).addClass("sectionTab");
    btn_sort_author.style.background = '#ADD8E6';
    btn_sort_author.style.color = 'black';
    btn_sort_author.style['border-radius'] = '0px';
    btn_sort_author.style.position = 'absolute';
    jQuery(btn_sort_author).click(function() { sort(jQuery(this), ".workshopItemAuthorName"); });

    if (collection_window != null)
    {
        btn_rem_published.style.top = '415px';
        btn_rem_published.style.right = '5px';
        collection_window.insertBefore(btn_rem_published, collection_window.firstChild);
        btn_add_published.style.top = '445px';
        btn_add_published.style.right = '5px';
        collection_window.insertBefore(btn_add_published, collection_window.firstChild);
        btn_rem_favorited.style.top = '485px';
        btn_rem_favorited.style.right = '5px';
        collection_window.insertBefore(btn_rem_favorited, collection_window.firstChild);
        btn_add_favorited.style.top = '515px';
        btn_add_favorited.style.right = '5px';
        collection_window.insertBefore(btn_add_favorited, collection_window.firstChild);
        btn_rem_subscribed.style.top = '555px';
        btn_rem_subscribed.style.right = '5px';
        collection_window.insertBefore(btn_rem_subscribed, collection_window.firstChild);
        btn_add_subscribed.style.top = '585px';
        btn_add_subscribed.style.right = '5px';
        collection_window.insertBefore(btn_add_subscribed, collection_window.firstChild);
        btn_rem_all.style.top = '625px';
        btn_rem_all.style.right = '5px';
        collection_window.insertBefore(btn_rem_all, collection_window.firstChild);
        btn_sort_name.style.top = '665px';
        btn_sort_name.style.right = '5px';
        collection_window.insertBefore(btn_sort_name, collection_window.firstChild);
        btn_sort_author.style.top = '695px';
        btn_sort_author.style.right = '5px';
        collection_window.insertBefore(btn_sort_author, collection_window.firstChild);
    }
    else if (right_contents != null)
    {
        btn_rem_published.style.top = '0px';
        btn_rem_published.style.right = '0px';
        right_contents.insertBefore(btn_rem_published, right_contents.firstChild);
        btn_add_published.style.top = '30px';
        btn_add_published.style.right = '0px';
        right_contents.insertBefore(btn_add_published, right_contents.firstChild);
        btn_rem_favorited.style.top = '70px';
        btn_rem_favorited.style.right = '0px';
        right_contents.insertBefore(btn_rem_favorited, right_contents.firstChild);
        btn_add_favorited.style.top = '100px';
        btn_add_favorited.style.right = '0px';
        right_contents.insertBefore(btn_add_favorited, right_contents.firstChild);
        btn_rem_subscribed.style.top = '140px';
        btn_rem_subscribed.style.right = '0px';
        right_contents.insertBefore(btn_rem_subscribed, right_contents.firstChild);
        btn_add_subscribed.style.top = '170px';
        btn_add_subscribed.style.right = '0px';
        right_contents.insertBefore(btn_add_subscribed, right_contents.firstChild);
        btn_rem_all.style.top = '210px';
        btn_rem_all.style.right = '0px';
        right_contents.insertBefore(btn_rem_all, right_contents.firstChild);
        btn_sort_name.style.top = '250px';
        btn_sort_name.style.right = '0px';
        right_contents.insertBefore(btn_sort_name, right_contents.firstChild);
        btn_sort_author.style.top = '280px';
        btn_sort_author.style.right = '0px';
        right_contents.insertBefore(btn_sort_author, right_contents.firstChild);
    }
})();