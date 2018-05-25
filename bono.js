function getAbjad(a) {
    var b = $(a).find(".head-title");
    firstLetter = [], b.each(function() {
        var a = $(this).text().toUpperCase();
        firstLetter.push(a.charAt(0))
    }), abjad.children("ul").find("li").each(function() {
        $(this).children("a").removeClass("active"), text = $(this).children("a").text(), firstLetter.indexOf(text.toUpperCase()) > -1 ? $(this).children("a").addClass("active").css("cursor", "pointer") : $(this).children("a").css("cursor", "default")
    })
}

function get_cat(a) {
    "forum" == a || "fjb" == a ? ($(".select-category").addClass("show"), $.ajax({
        url: "/misc/get_categories_search/" + a
    }).success(function(a) {
        var b = location.href.match(/forumchoice(\[\])*=([^&]+)/),
            c = "";
        b && (c = b[2]);
        var d = "";
        for (var e in a) c == a[e].forum_id ? (d = "selected", $("#search_category").parent().find(".customSelectInner").text(a[e].name)) : d = "", $("#search_category").append('<option data-child-list="' + a[e].child_list + '" value="' + a[e].forum_id + '" ' + d + ">" + a[e].name + "</option>")
    })) : $(".select-category").removeClass("show")
}

function spoiler(a) {
    "Show" == a.value ? ($(".content_" + $(a).attr("class")).slideDown(0), a.innerHTML = "", a.value = "Hide") : ($(".content_" + $(a).attr("class")).slideUp(0), a.innerHTML = "", a.value = "Show")
}

function get_smilies() {
    if (localSmilies = get_MRU(), localSmilies) var a = {
        smilies: $.param(localSmilies)
    };
    $.ajax({
        method: "POST",
        url: "/misc/get_smilies",
        data: a || {}
    }).success(function(a) {
        a = JSON.parse(a), smilies = JSON.parse(a.kaskus), $(".smilies-tab").replaceWith(smilies.tab), $(".smilies-tab-content").replaceWith(smilies.content), a.mru ? (smilies_mru = a.mru, $("#content-mru").html(smilies_mru), $("#mru").addClass("active"), $("#content-mru").addClass("active"), load_MRU()) : $("#mru").hide(), show_tab(".smiley-wrapper .smiley-tab .tab-content > .active"), $(".smiley-tab__item").not(".smiley-tab__item--unavailable").find(".smilie__in-action").click(function() {
            get_focus(), smiley_tracking(this.children), insert_smilikiti(this.children)
        }), $("#emoticons").show()
    })
}

function printDiv(a) {
    window.frames.print_frame.document.body.innerHTML = document.getElementById(a).innerHTML, window.frames.print_frame.window.focus(), window.frames.print_frame.window.print()
}

function get_MRU() {
    var a = [];
    if (localStorage[mru_key] && (mru = JSON.parse(localStorage[mru_key]), mru)) {
        for (var b in mru) b.search("smilie") > -1 && a.push(mru[b]);
        var c = {
            smilies: a
        }
    }
    return c || {}
}

function load_MRU() {
    var a = $("#content-mru").find(".loadMRU");
    return a && $.each(a, function(a, b) {
        $(b).attr("src", $('.loadSmilies[alt="' + $(b).attr("alt") + '"]').attr("data-src")), $(b).attr("title", $('.loadSmilies[alt="' + $(b).attr("alt") + '"]').attr("title")), $(b).removeAttr("class")
    }), !0
}

function show_tab(a) {
    var b = $(a).find(".loadSmilies");
    return b && $.each(b, function(a, b) {
        $(b).attr("src", $(b).attr("data-src")), $(b).removeAttr("data-src"), $(b).removeAttr("class")
    }), !0
}

function insert_smilikiti(a) {
    if (localStorage) {
        var b = JSON.parse(localStorage.getItem(mru_key));
        if (b)
            for (var c in b) c === "smilie" + $(a).attr("alt") && delete b[c];
        else var b = new Object;
        mru_limit == Object.keys(b).length && delete b[Object.keys(b)[0]], b["smilie" + $(a).attr("alt")] = $(a).attr("alt"), localStorage.setItem(mru_key, JSON.stringify(b))
    }
    emoticon = $(a).attr("alt") + " ", $.markItUp({
        replaceWith: emoticon
    }), "1" !== $.cookie("use_old_qnt") && (sceditorInstance.inSourceMode() ? sceditorInstance.insert($(a).attr("alt")) : sceditorInstance.insert('<img src="' + $(a).attr("src") + '" data-sceditor-emoticon="' + $(a).attr("alt") + '" border="0" alt="emoticon-' + $(a).attr("title") + '" title="' + $(a).attr("title") + '">', null, !1))
}

function notice(a, b) {
    void 0 === b && (b = 3e3), document.notice_tid && clearTimeout(document.notice_tid), $("#notice_span").html(a), $("#floating_notice").show(), document.notice_tid = setTimeout(function() {
        $("#floating_notice").fadeOut()
    }, b)
}

function printContent(a) {
    var b = document.body.innerHTML,
        c = document.getElementById(a).innerHTML;
    document.body.innerHTML = c, window.print(), document.body.innerHTML = b
}

function jump_page(a) {
    var b = $("#" + a).val(),
        c = $(".url_jump").val();
    window.location.href = c + b
}

function show_signin_popup() {
    $.ajax({
        url: "/user/login",
        success: function(a) {
            $("#signin-popup .modal-body").html(a), $("#signin-popup").modal("show"), $("#username").focus()
        }
    })
}

function show_signup_popup() {
    $.ajax({
        url: "/register",
        success: function(a) {
            $("#signin-popup .modal-body").html(a), $("#signin-popup").modal("show"), $("#signup_email").focus()
        }
    })
}

function get_search_dropdown() {
    var a = Date.now() / 1e3;
    parseFloat(last_process_time) + one_second > a || (last_process_time = a, get_top_keyword(), get_search_history(), show_search_drop_down())
}

function show_search_drop_down() {
    var a = get_term_local_data("top_keyword"),
        b = get_cookie_term_local_data("search_history_" + user_id);
    show_template_search(a, "top_search_choice", "#top_search", "last_top_keyword"), show_template_search(b, "history_search_choice", "#history_search", "last_search_history"), $(".jsSearchResult .jsSearchWrapper li").hover(function(a) {
        $(".jsSearchResult").find("li.is-selected").removeClass("is-selected"), $(this).addClass("is-selected"), indexSelected = $(".jsSearchResult .jsSearchWrapper li").index($(this))
    }), $(".jsSearchResult .jsSearchWrapper li").mousedown(function(a) {
        a.preventDefault(), $("#search").val($(this).text()), $("#btn-search").click()
    })
}

function show_template_search(a, b, c, d) {
    var e = "";
    for (var f in a) e += '<li><a href="javascript:void(0);">' + a[f] + "</a></li>";
    e != window[d] && (document.getElementById(b).innerHTML = e, window[d] = e, indexSelected = -1), "" == e ? $(c).hide() : $(c).show()
}

function get_top_keyword() {
    var a = null;
    a = localStorage ? parseFloat(localStorage.getItem("top_keyword_date")) : local_top_keyword_date;
    var b = Date.now() / 1e3;
    (isNaN(a) || a + ten_minutes < b) && $.ajax({
        url: "/misc/get_top_keyword",
        success: function(a) {
            localStorage ? (localStorage.setItem("top_keyword", a), localStorage.setItem("top_keyword_date", Date.now() / 1e3)) : (local_top_keyword = JSON.parse(a), local_top_keyword_date = Date.now() / 1e3), show_search_drop_down()
        },
        error: function() {
            show_search_drop_down()
        }
    })
}

function get_search_history() {
    var a = parseFloat($.cookie("search_history_date_" + user_id)),
        b = Date.now() / 1e3;
    (isNaN(a) || a + ten_minutes < b) && $.ajax({
        url: "/misc/get_search_history",
        success: function(a) {
            var c = "";
            c = "undefined" != typeof KASKUS_COOKIE_DOMAIN ? KASKUS_COOKIE_DOMAIN : COOKIE_DOMAIN, b = Date.now() / 1e3, $.cookie("search_history_" + user_id, a, {
                expires: b + ten_minutes,
                path: "/",
                domain: c,
                secure: !1
            }), $.cookie("search_history_date_" + user_id, b, {
                expires: b + ten_minutes,
                path: "/",
                domain: c,
                secure: !1
            }), show_search_drop_down()
        },
        error: function() {
            show_search_drop_down()
        }
    })
}

function get_term_local_data(a) {
    var b = {};
    if (localStorage) {
        if (b = localStorage.getItem(a)) try {
            b = JSON.parse(b)
        } catch (a) {
            b = {}
        }
    } else b = window["local_" + a];
    return b || {}
}

function get_cookie_term_local_data(a) {
    var b = $.cookie(a);
    try {
        b = JSON.parse(b)
    } catch (a) {
        b = {}
    }
    return b
}

function remove_search_history() {
    $.ajax({
        url: "/misc/remove_search_history",
        success: function() {
            var a = "";
            a = "undefined" != typeof KASKUS_COOKIE_DOMAIN ? KASKUS_COOKIE_DOMAIN : COOKIE_DOMAIN, date_now = Date.now() / 1e3, $.cookie("search_history_" + user_id, "[]", {
                expires: date_now + ten_minutes,
                path: "/",
                domain: a,
                secure: !1
            }), $.cookie("search_history_date_" + user_id, date_now, {
                expires: date_now + ten_minutes,
                path: "/",
                domain: a,
                secure: !1
            }), show_search_drop_down()
        }
    })
}

function onClickPreview(a) {
    a.id;
    $("#" + a.nextSibling.nextSibling.id).click()
}

function handleFiles(a, b, c) {
    var d = c.files,
        e = d[0],
        f = document.createElement("img"),
        g = ["image/png", "image/bmp", "image/gif", "image/jpeg"],
        h = (new Array, new FileReader);
    if (-1 === g.indexOf(e.type)) return void alert("file type is not allowed!!!");
    "image/gif" !== e.type ? (h.onload = function(d) {
        f.src = d.target.result;
        var g = document.createElement("canvas"),
            h = g.getContext("2d");
        h.drawImage(f, 0, 0);
        var i = f.width,
            j = f.height;
        i > j ? i > a && (j *= a / i, i = a) : j > b && (i *= b / j, j = b), g.width = i, g.height = j;
        var h = g.getContext("2d");
        h.drawImage(f, 0, 0, i, j);
        var k = g.toDataURL(e.type, .8);
        c.setAttribute("data-img", k), document.getElementById("image").setAttribute("src", k)
    }, h.readAsDataURL(e)) : alert("gambar gif tidak di resize")
}

function fetchCategories() {
    url = KASKUS_URL + "/misc/get_categories/" + catVersion, $.retrieveJSON(url, {}, function(a) {
        if (retryFetch && a.version != catVersion) $.clearJSON(url, {}), retryFetch = !1, fetchCategories();
        else {
            $("#cat-forum").replaceWith(a.forum), $("#cat-jb").replaceWith(a.jb), catLoaded = !0;
            var b, c;
            $("#filter-cat-forum").bind("keydown keyup", function(a) {
                var d = $("#update-tag ul.sidebar-category").find("li");
                if (40 === a.which) "keydown" === a.type && (b ? (b.removeClass("selected"), next = b.next(), next.length > 0 ? b = next.addClass("selected") : b.addClass("selected")) : b = d.eq(0).addClass("selected")), c = $(".scrolling-con-update ul li.selected").position().top - 140;
                else if (38 === a.which) "keydown" === a.type && (b ? (b.removeClass("selected"), next = b.prev(), next.length > 0 ? b = next.addClass("selected") : b.addClass("selected")) : b = d.last().addClass("selected"));
                else if (13 === a.which) $(".scrolling-con-update").find("li.selected").length > 0 && (window.location = $(".scrolling-con-update li.selected .categories-title").children("a").attr("href"));
                else if ("keyup" === a.type) {
                    $("#update-tag ul.sidebar-category").find("li").removeClass("selected"), searchField = $("#filter-cat-forum").val(), $(".flyout__search i.fa-search").replaceWith("<i class='fa fa-times'></i>"), $("#tabForum .flyout__search i.fa-times").click(function() {
                        $(this).replaceWith("<i class='fa fa-search'></i>"), $("#filter-cat-forum").val(""), $("#update-tag").html(""), $("#update-tag").addClass("hide")
                    });
                    try {
                        if (myExp = new RegExp(searchField, "i"), "" === searchField) return $("#update-tag").addClass("hide"), $("#tabForum .flyout__search i.fa-times").replaceWith("<i class='fa fa-search'></i>"), !1;
                        $.retrieveJSON(urlCatJSON, {
                            usergroupid: userGroupIdJSON
                        }, function(a) {
                            $("#update-tag").removeClass("hide"), output = '<ul class="flyout__result__list"><div class="flyout__scroll flyout__scroll--up"><i class="fa fa-chevron-up"></i></div>', $.each(a, function(a, b) {
                                -1 != b.forum_name.search(myExp) && (output += '<li class="flyout__result__item">', output += '<a class="flyout__result__link" href="' + decodeURIComponent(b.forum_url) + '">', output += '<img src="' + decodeURIComponent(b.forum_icon) + '" alt="" width="20" height="20" ><span>' + decodeURIComponent(b.forum_name), output += "</span></a>", output += "</li>")
                            }), output += '<div class="flyout__scroll flyout__scroll--down"><i class="fa fa-chevron-down"></i></div></ul>', $("#update-tag").html(output)
                        }, 864e5), b = "", checkScroller(".flyout__result__list")
                    } catch (a) {}
                }
            }), $("#filter-cat-jb").bind("keydown keyup", function(a) {
                var d = $("#update-tag ul.sidebar-category").find("li");
                if (40 === a.which) "keydown" === a.type && (b ? (b.removeClass("selected"), next = b.next(), next.length > 0 ? b = next.addClass("selected") : b.addClass("selected")) : b = d.eq(0).addClass("selected")), c = $(".scrolling-con-update ul li.selected").position().top - 140;
                else if (38 === a.which) "keydown" === a.type && (b ? (b.removeClass("selected"), next = b.prev(), next.length > 0 ? b = next.addClass("selected") : b.addClass("selected")) : b = d.last().addClass("selected"));
                else if (13 === a.which) $(".scrolling-con-update").find("li.selected").length > 0 && (window.location = $(".scrolling-con-update li.selected .categories-title").children("a").attr("href"));
                else if ("keyup" === a.type) {
                    $("#update-tag ul.sidebar-category").find("li").removeClass("selected"), searchField = $("#filter-cat-jb").val(), $(".flyout__search i.fa-search").replaceWith("<i class='fa fa-times'></i>"), $("#tabJB .flyout__search i.fa-times").click(function() {
                        $(this).replaceWith("<i class='fa fa-search'></i>"), $("#filter-cat-jb").val(""), $("#update-tag").html(""), $("#update-tag").addClass("hide")
                    });
                    try {
                        if (myExp = new RegExp(searchField, "i"), "" === searchField) return $("#update-tag").addClass("hide"), $("#tabJB .flyout__search i.fa-times").replaceWith("<i class='fa fa-search'></i>"), !1;
                        $.retrieveJSON(urlCatJSON, {
                            usergroupid: userGroupIdJSON
                        }, function(a) {
                            $("#update-tag").removeClass("hide"), output = '<ul class="flyout__result__list"><div class="flyout__scroll flyout__scroll--up"><i class="fa fa-chevron-up"></i></div>', $.each(a, function(a, b) {
                                -1 != b.forum_name.search(myExp) && (output += '<li class="flyout__result__item">', output += '<a class="flyout__result__link" href="' + decodeURIComponent(b.forum_url) + '">', output += '<img src="' + decodeURIComponent(b.forum_icon) + '" alt="" width="20" height="20" ><span>' + decodeURIComponent(b.forum_name), output += "</span></a>", output += "</li>")
                            }), output += '<div class="flyout__scroll flyout__scroll--down"><i class="fa fa-chevron-down"></i></div></ul>', $("#update-tag").html(output)
                        }, 864e5), b = "", checkScroller(".flyout__result__list")
                    } catch (a) {}
                }
            }), $(".flyout__tab__pane > .flyout__category__list").length > 0 && $(".flyout__tab__pane > .flyout__category__list")[0].scrollHeight > $(".flyout__tab__pane > .flyout__category__list").height() && $(".flyout__tab__pane > .flyout__category__list").siblings(".flyout__scroll--down").addClass("flyout__scroll--on"), $(".flyout__category__list").bind("scroll", function() {
                checkScroller($(this))
            }), $(".flyout__result__list").bind("scroll", function() {
                checkScroller($(this))
            }), $(".flyout__category-children__list").bind("scroll", function() {
                checkScroller($(this))
            })
        }
    }, 36e5)
}

function checkArrow() {
    forumCategories.hasClass("show-all") ? fjbCategories.find(".fa").attr("class", "fa fa-chevron-circle-up right") : fjbCategories.find(".fa").attr("class", "fa fa-chevron-circle-down right")
}

function homeSlide(a) {
    var b = a.find(".listing-sidebar").height() + 1,
        c = a.find(".listing-sidebar").length + 1;
    a.hasClass("show-five") ? (a.removeClass("show-five").addClass("show-all").animate({
        height: b * c
    }, {
        queue: !1,
        duration: 300
    }), a.next().removeClass("show-five").addClass("hide-all").animate({
        height: 32
    }, {
        queue: !1,
        duration: 300
    }), a.prev().removeClass("show-five").addClass("hide-all").animate({
        height: 32
    }, {
        queue: !1,
        duration: 300
    }), checkArrow()) : (a.hasClass("show-all") ? $("#home-categories").children("div").attr("class", "show-five").animate({
        height: 6 * b
    }, {
        queue: !1,
        duration: 300
    }) : a.hasClass("hide-all") ? (a.prev().removeClass("show-all").addClass("hide-all").animate({
        height: 32
    }, {
        queue: !1,
        duration: 300
    }), a.next().removeClass("show-all").addClass("hide-all").animate({
        height: 32
    }, {
        queue: !1,
        duration: 300
    }), a.removeClass("hide-all").addClass("show-all").animate({
        height: b * c
    }, {
        queue: !1,
        duration: 300
    })) : a.addClass("show-five").animate({
        height: 6 * b
    }, {
        queue: !1,
        duration: 300
    }), checkArrow())
}

function swapFeatured() {
    active = $(".hot-featured .tab-nav li.active"), activeDataFjb = $("#fjb-highlight").find(".carousel-indicators").children(".active"), _gaq.push([activeDataFjb.attr("data-event"), activeDataFjb.attr("data-event-category"), activeDataFjb.attr("data-event-action"), activeDataFjb.attr("data-event-label")]), activeContent = $(".hot-featured .tab-panel .tab-pane.active"), next = active.next().length > 0 ? active.next().addClass("active") : $(".hot-featured .tab-nav li:first").addClass("active"), activeNext = activeContent.next().length > 0 ? activeContent.next().addClass("active") : $(".hot-featured .tab-panel .tab-pane:first").addClass("active"), active.removeClass("active"), activeContent.removeClass("active")
}

function scrollContent(a, b) {
    var c = "up" === a ? "-=5px" : "+=5px";
    $(b).animate({
        scrollTop: c
    }, 1, function() {
        scrolling && scrollContent(a, b)
    })
}

function reputationTrigger() {
    $(".reputation-icon").hover(function() {
        $(this).hasClass("cendol-big") ? $(this).addClass("shake") : $(this).addClass("tada")
    }, function() {
        $(this).hasClass("cendol-big") ? $(this).removeClass("shake") : $(this).removeClass("tada")
    }), $(".reputation-icon").on("click", function(a) {
        a.preventDefault(), $(this).closest(".radio").prev().removeClass("selected"), $(this).closest(".radio").next().removeClass("selected"), $(this).closest(".radio").addClass("selected")
    })
}

function OtherSelectCheck(a) {
    a ? (jasaOptionValue = document.getElementById("jasaLain").value, jasaOptionValue == a.value ? (document.getElementById("namajasa").style.display = "block", document.getElementById("input-jasa").style.display = "table", document.getElementById("jasa-text").style.display = "none") : (document.getElementById("namajasa").style.display = "none", document.getElementById("input-jasa").style.display = "none", document.getElementById("jasa-text").style.display = "block")) : (document.getElementById("namajasa").style.display = "none", document.getElementById("input-jasa").style.display = "none")
}

function takePicture(a) {
    if (!1 === cameraGranted[a]) return !1;
    var b = document.querySelector("." + a + "-cam");
    if (navigator.mediaDevices && !cameraOn[a]) cameraOn[a] = !0, navigator.mediaDevices.getUserMedia({
        video: !0
    }).then(function(c) {
        b.src = window.URL.createObjectURL(c), cameraGranted[a] = !0
    }).catch(function(b) {
        $(".camera-refused--wrapper").show(), $(".camera-snapshot--area").addClass("disabled"), cameraGranted[a] = !1
    });
    else {
        var c = b.offsetWidth,
            d = b.offsetHeight;
        b.width = c, b.height = d, context.drawImage(b, 0, 0, 860, 650);
        var e = canvas.toDataURL("image/png");
        $("." + a + "-capture").attr("src", e).show(), camCallback(a)
    }
}

function textAreaAdjust(a) {
    a.style.height = "1px", a.style.height = 5 + a.scrollHeight + "px"
}

function checkButton() {
    var a = "";
    recoveryCodeInputs = document.getElementsByClassName("recovery-code");
    for (i in recoveryCodeInputs) recoveryCodeInputs[i].value && (a += recoveryCodeInputs[i].value);
    a.length >= 8 ? $("#submit-button").addClass("btn-blue").removeClass("btn-grey").prop("disabled", !1) : $("#submit-button").addClass("btn-grey").removeClass("btn-blue").prop("disabled", !0)
}

function checkObject(a) {
    return existing = !!a.length, existing
}

function stickSidebar() {
	leaderboardHeight = ($('#bottom-leaderboard').length && $('.main-content').width() > 689) ? 100 : 0;

	if( sidebar.height() < $('.main-content').height() ){
		if( windowPanel.scrollTop() > ( heightright - windowPanel.height() ) + momod.height() + 15 && mediaQuery.matches ){
			if( windowPanel.scrollTop() > ( footer.offset().top - windowPanel.height() - 40 - leaderboardHeight) ){
				var footerHeight = windowPanel.scrollTop() - ( footer.offset().top - windowPanel.height() - leaderboardHeight);
				sidebar.css({
					position: 'fixed',
					bottom: footerHeight + 40
				});
			}else{
				sidebar.css({
					position: 'fixed',
					bottom: 0
				});
			}
		}else{
			sidebar.css('position', 'static');
		}
	}
}

function stickSidebarLanding() {
    if (sliderHeight = $(".fjb.landing").length ? 320 : 0, sidebar.height() < landingMainBar.height())
        if (windowPanel.scrollTop() > heightright - windowPanel.height() + batasScrollBawah.height() + sliderHeight + 10 && mediaQuery.matches)
            if (windowPanel.scrollTop() > footer.offset().top - windowPanel.height() - 40) {
                var a = windowPanel.scrollTop() - (footer.offset().top - windowPanel.height());
                sidebar.css({
                    position: "fixed",
                    bottom: a + 40
                })
            } else sidebar.css({
                position: "fixed",
                bottom: 0
            });
    else sidebar.css("position", "static")
}

function stickSkyScrapper() {
    if (windowPanel.height() > 600)
        if (windowPanel.scrollTop() > footer.offset().top - 700) {
            var a = windowPanel.scrollTop() - (footer.offset().top - windowPanel.height());
            skyScrapper.css({
                bottom: a + 640,
                top: "initial"
            })
        } else skyScrapper.css({
            top: 99
        })
}

function stickSidebarHot() {
    if (sidebar.height() < $(".hot-thread-wrap").height())
        if (windowPanel.scrollTop() > heightright - windowPanel.height() + batasScrollBawah.height() + 15)
            if (windowPanel.scrollTop() > footer.offset().top - windowPanel.height() + 5) {
                var a = windowPanel.scrollTop() - (footer.offset().top - windowPanel.height());
                sidebar.css({
                    position: "fixed",
                    bottom: a
                })
            } else sidebar.css({
                position: "fixed",
                bottom: 0
            });
    else sidebar.css("position", "static")
}

function ControlStick() {
    var a = windowPanel.scrollTop() + 50;
    $("body").hasClass("fjb") ? (userContorlVal = 0, controlOffset = 1e6) : (userContorlVal = 0, 0 != limitControlStick.length ? controlOffset = limitControlStick.offset().top : controlOffset = 1e6), a > forumControl.offset().top && !StatusControlStick && a < controlOffset && (userControlStick.css({
        top: userContorlVal
    }), $(".global-search").css("opacity", "0"), StatusControlStick = !0), (a < forumControl.offset().top || a > controlOffset) && (!0 === StatusControlStick && (userControlStick.css({
        top: -500
    }), $(".global-search").css("opacity", "1"), StatusControlStick = !1), $(".short-url").hasClass("open") && $(".short-url").removeClass("open"))
}

function showSingleLayerHeader() {
    $(".site-header__category .flyout__trigger").show(), $(".site-header__action .site-header__quick").show(), $(".site-header--bot").addClass("hide-up"), $(".site-header__anchor").addClass("scrolled"), $(".skin-banner").addClass("adjust-top"), $(".site-header--top").addClass("site-header__wrapper--scrolled"), $("body").hasClass("fjb") ? $(".site-header--top").addClass("site-header__wrapper--jb") : $(".site-header--top").addClass("site-header__wrapper--forum")
}

function showDoubleLayerHeader() {
    $(".site-header--bot").removeClass("hide-up"), $(".site-header__category .flyout__trigger").hide(), $(".site-header__action .site-header__quick").hide(), $(".site-header__anchor").removeClass("scrolled"), $("body").hasClass("fjb") ? $(".site-header--top").removeClass("site-header__wrapper--jb") : $(".site-header--top").removeClass("site-header__wrapper--forum"), $(".site-header--top").removeClass("site-header__wrapper--scrolled"), $(".skin-banner").removeClass("adjust-top")
}

function mainNavigationHeader() {
    var a = windowPanel.scrollTop() + 50,
        b = ($(".flyout__trigger"), $(".flyout__anchor"), $(".main-content-full"));
    checkObject(b) && (a > b.offset().top ? showSingleLayerHeader() : showDoubleLayerHeader()), checkObject(forumControl) && (a > forumControl.offset().top ? showSingleLayerHeader() : showDoubleLayerHeader())
}

function borderHeader() {
    windowPanel.scrollTop() >= 10 ? $(".site-header").addClass("scrolled") : $(".site-header").removeClass("scrolled")
}

function stickyInvoiceSidebar() {
    var a = $(".main-content")[0].scrollHeight - $(".invoice-sidebar")[0].scrollHeight;
    windowPanel.scrollTop() >= a ? ($(".invoice-sidebar").css("position", "absolute"), $(".invoice-sidebar").css("bottom", "0")) : ($(".invoice-sidebar").css("position", "fixed"), $(".invoice-sidebar").css("bottom", "inherit"))
}

function stickyOrderInfoSidebar() {
    windowPanel.scrollTop() >= 30 ? ($(".order-sidebar").css("position", "fixed"), $(".order-sidebar").css("margin-top", "-30px")) : ($(".order-sidebar").css("position", "relative"), $(".order-sidebar").css("margin-top", "0"))
}

function stickyCreateListingBackToTop() {
    var a = windowPanel.scrollTop(),
        b = createListingPreview,
        c = $(".create-listing__back-to-top");
    a > b.height() - b.offset().top ? c.addClass("stick") : c.removeClass("stick")
}

function relatedContent() {
    $(this).scrollTop() > $(".kaskus-ads .kasad-h").offset().top - $(window).height() && !relatedThread.hasClass("disable") && !relatedThread.hasClass("fjb") ? relatedThread.addClass("nongol") : relatedThread.removeClass("nongol")
}

function checkScroller(a) {
    a[0].scrollHeight > a.height() && (a[0].scrollHeight - a.scrollTop() == a.outerHeight() ? a.siblings(".flyout__scroll--down").removeClass("flyout__scroll--on") : 0 === a.scrollTop() ? a.siblings(".flyout__scroll--up").removeClass("flyout__scroll--on") : (a.siblings(".flyout__scroll--down").addClass("flyout__scroll--on"), a.siblings(".flyout__scroll--up").addClass("flyout__scroll--on")))
}

function initSticky() {
    $("[sticky-host]").each(function(a, b) {
        function c() {
            editor = "undefined" == typeof editor_type ? 1 : editor_type, 0 == editor && (toggleStickyUp(d, showStickyUp(d)), toggleStickyBottom(d, showStickyBottom(d))), "1" !== $.cookie("use_old_qnt") && (toggleStickyUp(d, showStickyUp(d)), toggleStickyBottom(d, showStickyBottom(d)))
        }
        var d = $(b).attr("sticky-host"),
            e = $(b).find("textarea");
        $(window).scroll(function() {
            c()
        }), e.keyup(function(a) {
            13 != (a.keyCode || a.which) && 8 != (a.keyCode || a.which) && 46 != (a.keyCode || a.which) || c()
        })
    })
}

function showStickyUp(a) {
    return !isLeaving(a) && isScrollingPastTop(a)
}

function showStickyBottom(a) {
    return isEntering(a) && isScrollingPastBottom(a)
}

function isEntering(a) {
    var b = $("[sticky-host=" + a + "]").first(),
        c = parseInt(b.attr("top-offset")) || 0,
        d = $(window).scrollTop();
    return b.offset().top + c - $(window).height() - d < 0
}

function isLeaving(a) {
    var b = $("[sticky-host=" + a + "]").first(),
        c = parseInt(b.attr("bottom-offset")) || 0,
        d = $(window).scrollTop();
    return b.offset().top - c + b.height() - d < 0
}

function isScrollingPastTop(a) {
    var b = $("[sticky-host=" + a + "]").first(),
        c = $(window).scrollTop();
    return b.offset().top - c < 0
}

function isScrollingPastBottom(a) {
    var b = $("[sticky-host=" + a + "]").first();
    return $(window).scrollTop() + $(window).height() - (b.offset().top + b.height()) < 0
}

function toggleStickyUp(a, b) {
    var c = $("[sticky-up=" + a + "]").first();
    void 0 !== c && b !== c.is(":visible") && c.css("position", "fixed").css("top", "0").toggle(b)
}

function toggleStickyBottom(a, b) {
    var c = $("[sticky-bottom=" + a + "]").first();
    void 0 !== c && b !== c.is(":visible") && c.css("position", "fixed").css("bottom", "0").toggle(b)
}

function kstore_widget() {
    var a = {
            "0814": "4",
            "0815": "4",
            "0816": "4",
            "0855": "4",
            "0856": "4",
            "0857": "4",
            "0858": "4",
            "0881": "13",
            "0882": "13",
            "0883": "13",
            "0884": "13",
            "0885": "13",
            "0886": "13",
            "0887": "13",
            "0888": "13",
            "0889": "13",
            "0895": "12",
            "0896": "12",
            "0897": "12",
            "0898": "12",
            "0899": "12",
            "0811": "2",
            "0812": "2",
            "0813": "2",
            "0821": "2",
            "0822": "2",
            "0823": "2",
            "0851": "2",
            "0852": "2",
            "0853": "2",
            "0817": "3",
            "0818": "3",
            "0819": "3",
            "0859": "3",
            "0877": "3",
            "0878": "3",
            "0879": "3",
            9990: "21",
            9990: "21",
            9991: "21",
            9992: "21",
            9993: "21",
            9994: "21",
            9995: "21",
            9996: "21",
            9997: "21",
            9998: "21",
            9999: "21"
        },
        b = "",
        c = {};
    $("#kplus_paket").change(function() {
        $("#kplus_price").html(package[$(this).val()].price)
    }), $("#kplus_paket").change(function() {
        $("#kplus_price").html(parseInt(package[$(this).val()].price).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR"
        }).replace("Rp", "Rp "))
    }), $("#epulsa_type").change(function() {
        $("#pulsa_form").toggle(), $("#pln_form").toggle()
    }), $("#product_id").change(function() {
        for (i in c)
            if (c[i].id == $(this).val()) {
                $("#harga_epulsa").html(c[i].price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                }).replace("Rp", "Rp "));
                break
            }
    }), $("#nominal_pln").change(function() {
        for (i in pln_products)
            if (pln_products[i].id == $(this).val()) {
                $("#harga_token").html(pln_products[i].price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                }).replace("Rp", "Rp "));
                break
            }
    }), $("#phone").keyup(function() {
        value = $("#phone").val(), value.length >= 4 && (currentPrefix = value.substring(0, 4), b != currentPrefix && a[currentPrefix] && ($("#operator_pulsa").val(a[currentPrefix]), $.getJSON(EPULSA_URL + "/api/v1/operators/" + a[currentPrefix] + "?callback=?", function(a) {
            $("#product_id").html('<option value="" disabled>Pilih paket</option>'), c = a.products.data;
            for (i in c) $('<option value="' + c[i].id + '">' + c[i].name + "</option>").appendTo("#product_id");
            $("#product_id").change()
        })), b = currentPrefix)
    }), $.getJSON(EPULSA_URL + "/api/v1/operators/17?callback=?", function(a) {
        $("#nominal_pln").html('<option value="" disabled>Pilih paket</option>'), pln_products = a.products.data;
        for (i in pln_products) $('<option value="' + pln_products[i].id + '">' + pln_products[i].name + "</option>").appendTo("#nominal_pln");
        $("#nominal_pln").change()
    }), $("#phone").keyup()
}

function validateEmail(a) {
    return !!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(a)
}

function multiEmail(a) {
    for (var b = $("#share-from"), c = a.split(","), d = 0; d < c.length; d++) {
        if (!validateEmail(c[d].trim(), 1, 0)) return b.next().remove(), b.css("border-color", "red"), b.after('<span style="margin: 5px 0;float: left;color: #f00;">One or more email address is invalid!</span>'), !1
    }
    return $("#form-email-thread").submit(), !0
}
if (window.KaskusUtil = function() {
        function a(a, b, c) {
            var d;
            return function() {
                var e = this,
                    f = arguments,
                    g = function() {
                        d = null, c || a.apply(e, f)
                    },
                    h = c && !d;
                clearTimeout(d), d = setTimeout(g, b || 200), h && a.apply(e, f)
            }
        }
        return {
            debounce: a
        }
    }(), $("#all-category").length) {
    var iterations = 1,
        abjad = $(".abjad"),
        search_category = $(".search-category"),
        closestSelector = $('li[id^="anc-"]');
    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase()
        })
    }, jQuery.expr[":"].Contains = function(a, b, c) {
        return jQuery(a).text().toUpperCase().indexOf(c[3].toUpperCase()) >= 0
    }, jQuery.expr[":"].contains = function(a, b, c) {
        return jQuery(a).text().toUpperCase().indexOf(c[3].toUpperCase()) >= 0
    }, unactiveTitle = $(".sub-category, .headache-title").find("a"), $("ul.nav-tabs").find("a").on("click", function() {
        search_category.val(""), closestSelector.show(), unactiveTitle.css("color", "#555555"), getAbjad($(this).attr("href"))
    }), abjad.children("ul").find("a").on("click", function() {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 60
        }, 500), !1
    }), search_category.keyup(function(a) {
        if (phrase = $(this).val(), closestSelector.show(), "" === phrase || void 0 === phrase || phrase.length < 3) return unactiveTitle.css("color", "#555555"), !1;
        phrase = phrase.capitalize(), SelectorContainer = $("#all-category a:contains(" + phrase + ")"), search_category.find("a").css({
            "text-decoration": "none",
            color: "#ccc"
        }), closestSelector.hide(), $(".headache-title").find("a").css("color", "#ccc"), SelectorContainer.css("color", "#1497ec").closest('li[id^="anc-"]').css("display", "block")
    }), $(window).load(function() {
        $("ul.nav-tabs").find("li.active").children("a").click()
    })
}
var ten_minutes = 600,
    one_second = 1,
    local_search_history_date, local_search_history, local_top_keyword_date, local_top_keyword, indexSelected = -1,
    last_process_time = 0,
    last_search_history, last_top_keyword;
$(".watchlist").on("click", function() {
    $$ = $(this), $$.hasClass("watched") ? $$.removeClass("watched").html('<i class="fa fa-eye"></i> Watch List') : $$.addClass("watched").html('<i class="fa fa-eye-slash"></i> Remove Watch List')
}), $(".header-trigger").on("click", function() {
    $("#left-nav").hasClass("full-show") || $("#bgover").length ? $("#bgover").remove() : $("body").prepend('<div id="bgover" onclick="$(\'.header-trigger\').click()"></div>')
});
var khplist = $("#k-hp-list");
khplist.find("label").click(function() {
    var a = $(this).find("i").attr("class");
    khplist.find("li").removeClass("selected"), $(this).closest("li").addClass("selected"), $("#header-search-trigger").attr("class", a)
});
var menuAccordion = $("#menu-accordion");
menuAccordion.children("ul").find("a").click(function() {
    var a = $(this).next();
    return a.is("ul") && a.is(":visible") && ($(this).closest("li").removeClass("open"), a.slideUp()), a.is("ul") && !a.is(":visible") && (menuAccordion.children("ul").find("ul:visible").slideUp(), menuAccordion.find("li").removeClass("open"), $(this).closest("li").addClass("open"), a.slideDown()), 0 === $(this).closest("li").find("ul").children().length
}), $(".accordion-menu > ul > li > a").click(function() {
    var a = $(this).attr("href");
    switch ($(".accordion-menu ul ul").slideUp(), $(".accordion-menu ul li").removeClass("open"), $(this).next().is(":visible") || ($(this).next().slideDown(), $(this).closest("li").addClass("open")), 1 == $(this).has(".fa-angle-right").length) {
        case !0:
            $(this).find(".fa-angle-right").addClass("fa-angle-down"), $(this).find(".fa-angle-right").removeClass("fa-angle-right");
            break;
        case !1:
            $(this).find(".fa-angle-down").addClass("fa-angle-right"), $(this).find(".fa-angle-down").removeClass("fa-angle-down")
    }
    return "#" != a && $(window).attr("location", a), !1
}), $(".poll-swap-result").click(function() {
    $("#polling-form").addClass("hide"), $("#polling-result").removeClass("hide")
}), $(".poll-swap-back").click(function() {
    $("#polling-form").removeClass("hide"), $("#polling-result").addClass("hide")
}), $(".text-size-increase").click(function() {
    currentSize = parseInt($(".entry").css("font-size")) + 1, currentSize <= 32 && ($(".entry").css("font-size", currentSize), $(".post-quote").children("span").css("font-size", currentSize))
}), $(".text-size-decrease").click(function() {
    currentSize = parseInt($(".entry").css("font-size")) - 1, currentSize >= 10 && ($(".entry").css("font-size", currentSize), $(".post-quote").children("span").css("font-size", currentSize))
}), $(".multi-quote").click(function() {
    $(this).toggleClass("o-btn--multi-quoted")
}), $(".quick-reply").click(function() {
    $(this).parent().find(".hfeed").addClass("bagus")
}), $(".btn-close").click(function() {
    $(this).parent().hide()
});
var titleMessage = $("#title-message");
if (titleMessage.find("label").click(function() {
        $$ = $(this), $$.find("input").prop("checked", !0), titleMessage.find("label").removeClass("selected"), $$.addClass("selected"), $$.find("img").length < 1 ? titleMessage.find(".btn").html("No icon") : (img = $$.find("img").attr("src"), titleMessage.find(".btn").html('<img src="' + img + '" width="15" />'))
    }), $(".jump-page-form").find(".dropdown-toggle").on("click", function(a) {
        a.preventDefault(), setTimeout(function() {
            $(".jump-page-top").focus()
        }, 20)
    }), $(".sidebar-trigger-small-screen").on("click", function() {
        setTimeout(function() {
            $("#filter-cat").focus()
        }, 10)
    }), $(".short-url").children("a").on("click", function() {
        setTimeout(function() {
            $(".short-url").find("input").focus().select()
        }, 50)
    }), $(".dropdown-close").on("click", function() {
        $(".dropdown-embed.open").removeClass("open")
    }),
    $(".fjb-refine-search-form .location, .fjb-refine-search-form .close").on("click", function(a) {
        a.preventDefault(), $(".location-list-con").toggle()
    }), $("#loginform").find(".dropdown-toggle").on("click", function(a) {
        a.preventDefault(), setTimeout(function() {
            $("#username").focus()
        }, 20)
    }), $(".related-thread, .bengkel-content").length) {
    var widthList = $(".related-thread, .wrap-bengkel").find("li").outerWidth(),
        lengthList = $(".related-thread, .wrap-bengkel").find("li").length,
        state = 0,
        leftPos = 0,
        lengthData = 1;
    $(".bengkel-content").length && (widthList += 110, lengthData = 3), $(".related-thread").find(".close").bind("click", function() {
        $(".related-thread").removeClass("nongol").addClass("disable")
    }), $(".related, .arrow-bengkel").bind("click", function(a) {
        if (a.preventDefault(), $(this).hasClass("prev")) {
            if (0 === state) return;
            state -= 1, leftPos = widthList * state, $(".wrap-scroll, .wrap-bengkel").animate({
                scrollLeft: leftPos
            }, 600)
        } else {
            if (state === lengthList - lengthData) return;
            state += 1, leftPos = widthList * state, $(".wrap-scroll, .wrap-bengkel").animate({
                scrollLeft: leftPos
            }, 600)
        }
    }), $("#show-related").on("click", function(a) {
        a.preventDefault(), $(".related-thread").toggleClass("nongol")
    })
}
$(".switch-view").on("click", function() {
    $(".switch-view").toggleClass("on"), $("body").toggleClass("response")
}), $(".autoplay-widget .btn-toggle").click(function() {
    $(".autoplay-widget .btn-toggle").toggleClass("on")
}), $(".card__subscribe--btn").click(function() {
    $(this).toggleClass("active")
}), $(".add-video-via-link").click(function() {
    $("#default_video_picture_file").toggleClass("disappear"), $("#default_video_picture").toggleClass("disappear"), $("#input-video-url").toggleClass("active"), $(".delete-video-btn").toggleClass("active"), $("#input-video-url").focus()
}), $(".delete-video-btn").click(function() {
    if ($("#input-video-url").hasClass("active") && ($("#default_video_picture").removeClass("disappear"), $("#default_video_picture_file").removeClass("disappear"), $(".delete-video-btn").removeClass("active"), $("#input-video-url").toggleClass("active")), $(".uploaded-video").hasClass("active") && ($("#default_video_picture").removeClass("disappear"), $("#default_video_picture_file").removeClass("disappear"), $(".delete-video-btn").removeClass("active"), $("#iframe-preview").html("")), $("#uploaded-video-file").hasClass("active")) {
        $("#uploaded-video-file").toggleClass("active"), $("#default_video_picture_file").toggleClass("disappear"), $("#default_video_picture").toggleClass("disappear"), $(".delete-video-btn").toggleClass("active");
        var a = new window.FileReader,
            a = window.URL || window.webKitURL;
        url = a.createObjectURL(file), video.src = url, a && a.createObjectURL && a.revokeObjectURL(url)
    }
});
var linksearch, searchchoice, catLoaded, retryFetch = !0,
    heightContentHover = $(".hover-sidebar-content").height(),
    forumCategories = $("#forum-home-categories"),
    fjbCategories = $("#fjb-home-categories");
$("#home-categories").length && fjbCategories.find(".head-categories-title").hover(function() {
    fjbCategories.hasClass("show-five") && $(this).find(".fa").attr("class", "fa fa-chevron-circle-up right")
}, function() {
    fjbCategories.hasClass("show-five") && $(this).find(".fa").attr("class", "fa fa-chevron-circle-down right")
}), $(".head-categories-title").bind("click", function(a) {
    a.preventDefault(), homeSlide($(this).parent("div"))
}), $(".masonry").masonry({
    itemSelector: ".masonry--item"
});
var refreshInterval = null;
$("#fjb-highlight").on("slid.bs.carousel", function() {
        activeDataFjb = $("#fjb-highlight").find(".carousel-indicators").children(".active"), _gaq.push([activeDataFjb.attr("data-event"), activeDataFjb.attr("data-event-category"), activeDataFjb.attr("data-event-action"), activeDataFjb.attr("data-event-label")])
    }), $(".hot-featured").on("mouseleave", function() {
        refreshInterval = setInterval(swapFeatured, 2e3)
    }), $(".hot-featured").on("mouseover", function() {
        clearInterval(refreshInterval)
    }),
    function(a) {
        a.fn.cycle = function(b, c) {
            function d() {
                h.eq(g).removeClass(c), h.eq(f).addClass(c), g = f, f = (f + 1) % e, setTimeout(d, b)
            }
            var e = a(this).length,
                f = 0,
                g = 0,
                h = a(this);
            return h.eq(0).addClass(c), setTimeout(d, b), a(this)
        }
    }(jQuery), document.onkeydown = function(a) {
        if (a = a || window.event, key = a.which || a.charCode || a.keyCode, 27 == key && $("#bgover").click(), !$('input[type="text"], textarea, input[type="radio"], input[type="checkbox"], input[type="password"] , input[type="email"]').is(":focus")) {
            if (state = 0, a.altKey || a.ctrlKey || !a.shiftKey)
                if (a.ctrlKey && a.shiftKey && !a.altKey) switch (key) {
                    case 37:
                        link = $(".prev-thread").attr("href"), link && (window.location = link);
                        break;
                    case 39:
                        link = $(".next-thread").attr("href"), link && (window.location = link);
                        break;
                    default:
                        key = ""
                } else {
                    if (a.altKey || a.ctrlKey || a.shiftKey || a.metaKey) return !0;
                    switch (key) {
                        case 74:
                            state < $(".permalink").length - 1 && (state++, scrollval = $(".permalink").eq(state).offset().top, $("body").animate({
                                scrollTop: scrollval - 100
                            }, 500));
                            break;
                        case 75:
                            state > 0 && (state--, scrollval = $(".permalink").eq(state).offset().top, $("body").animate({
                                scrollTop: scrollval - 100
                            }, 500));
                            break;
                        case 49:
                            $(".navbar-brand").focus();
                            break;
                        case 50:
                            $("#search").is(":focus") || $("#kk-forum a").focusout();
                            break;
                        case 51:
                            $("#search").is(":focus") || $("#kk-fjb a").focusout();
                            break;
                        case 52:
                            $("#kk-groupee a").focus();
                            break;
                        case 53:
                            $("#kk-radio a").focus();
                            break;
                        default:
                            key = ""
                    }
                } else switch (key) {
                    case 88:
                        $(".spoiler input[type=button]").click();
                        break;
                    case 65:
                        $("body").hasClass("landing") ? ($(".sidebar-trigger-small-screen").is(":visible") && $(".sidebar-trigger-small-screen").click(), setTimeout(function() {
                            $("#filter-cat").focus()
                        }, 10)) : $(".sidebar-trigger-small-screen").click();
                        break;
                    case 83:
                        setTimeout(function() {
                            $("#search").focus()
                        }, 10);
                        break;
                    case 49:
                        link = $(".navbar-brand").attr("href"), link && (window.location = link);
                        break;
                    case 50:
                        link = $("#kk-forum a").attr("href"), $("#search").is(":focus") || (window.location = link);
                        break;
                    case 51:
                        link = $("#kk-fjb a").attr("href"), $("#search").is(":focus") || (window.location = link);
                        break;
                    case 52:
                        link = $("#kk-groupee a").attr("href"), link && (window.location = link);
                        break;
                    case 53:
                        link = $("#kk-radio a").attr("href"), link && (window.location = link);
                        break;
                    case 82:
                        link = $("#act-post").attr("href"), link && (window.location = link);
                        break;
                    case 37:
                        link = $(".pagination .previous-page").attr("href"), link && (window.location = link);
                        break;
                    case 39:
                        link = $(".pagination .next-page").attr("href"), link && (window.location = link);
                        break;
                    default:
                        key = ""
                }
            return !0
        }
    }, $("#search-header-button , #k-hp-list").hover(function() {
        $("#search-header-button").addClass("hover")
    }, function() {
        $("#search-header-button").removeClass("hover")
    }), $(".flyout__trigger").mouseover(function() {
        $(".flyout__anchor").show(), $(".flyout__tab__pane > .flyout__category__list").length > 0 && $(".flyout__tab__pane > .flyout__category__list")[0].scrollHeight > $(".flyout__tab__pane > .flyout__category__list").height() && $(".flyout__tab__pane > .flyout__category__list").siblings(".flyout__scroll--down").addClass("flyout__scroll--on"), $(".flyout__subscribed__list").length > 0 && $(".flyout__subscribed__list")[0].scrollHeight > $(".flyout__subscribed__list").height() && $("flyout__subscribed__list").siblings(".flyout__scroll--down").addClass("flyout__scroll--on")
    }).mouseout(function() {
        $(".flyout__anchor").hide()
    }), $(".flyout__content").mouseenter(function() {
        $(this).closest(".flyout__anchor").show()
    }).mouseleave(function() {
        $(this).closest(".flyout__anchor").hide()
    }), $(".flyout__category__item--has-children , .flyout__category-children__item--has-children").mouseover(function() {
        $(this).closest(".flyout__content").addClass("flyout__content--triggered"), $(this).find(".flyout__category-children__list").first().length > 0 && $(this).find(".flyout__category-children__list").first()[0].scrollHeight > $(this).find(".flyout__category-children__list").first().height() && $(this).find(".flyout__category-children__list").first().siblings(".flyout__scroll--down").addClass("flyout__scroll--on")
    }).mouseout(function() {
        $(this).closest(".flyout__content").removeClass("flyout__content--triggered")
    }), $(".flyout__subscribed__anchor").mouseover(function() {
        $(this).closest(".flyout__content").addClass("flyout__content--triggered"), $(this).closest(".flyout__anchor").addClass("flyout__anchor--subscribed"), $(this).find(".flyout__subscribed__list").length > 0 && $(this).find(".flyout__subscribed__list")[0].scrollHeight > $(this).find(".flyout__subscribed__list").height() && $(this).find(".flyout__subscribed__list").siblings(".flyout__scroll--down").addClass("flyout__scroll--on")
    }).mouseout(function() {
        $(this).closest(".flyout__content").removeClass("flyout__content--triggered"), $(this).closest(".flyout__anchor").removeClass("flyout__anchor--subscribed")
    }), $(".flyout__subscribed__panel").mouseover(function() {
        $(this).siblings(".flyout__subscribed__anchor__link").addClass("flyout__subscribed__anchor__link--hovered")
    }).mouseout(function() {
        $(this).siblings(".flyout__subscribed__anchor__link").removeClass("flyout__subscribed__anchor__link--hovered")
    }), $(".flyout__category__panel").mouseover(function() {
        $(this).siblings(".flyout__category__link").addClass("flyout__category__link--hovered"), $(this).siblings(".flyout__category-children__link").addClass("flyout__category-children__link--hovered")
    }).mouseout(function() {
        $(this).siblings(".flyout__category__link").removeClass("flyout__category__link--hovered"), $(this).siblings(".flyout__category-children__link").removeClass("flyout__category-children__link--hovered")
    });
var scrolling = !1;
$(".flyout__scroll--down").bind("mouseover", function(a) {
        scrolling = !0, scrollContent("down", $(this).siblings(".flyout__category-children__list")), scrollContent("down", $(this).siblings(".flyout__category__list")), scrollContent("down", $(this).siblings(".flyout__result__list")), scrollContent("down", $(this).siblings(".flyout__subscribed__list"))
    }).bind("mouseout", function(a) {
        scrolling = !1
    }), $(".flyout__scroll--up").bind("mouseover", function(a) {
        scrolling = !0, scrollContent("up", $(this).siblings(".flyout__category-children__list")), scrollContent("up", $(this).siblings(".flyout__category__list")), scrollContent("up", $(this).siblings(".flyout__result__list")), scrollContent("up", $(this).siblings(".flyout__subscribed__list"))
    }).bind("mouseout", function(a) {
        scrolling = !1
    }), $(".ani-swing").bind("webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend", function() {
        $(this).removeClass("swing")
    }), $(".ani-swing").hover(function() {
        $(this).addClass("swing")
    }), $(".vote-up-off").hover(function() {
        $(this).parent().toggleClass("vote-cendol")
    }), $(".vote-down-off").hover(function() {
        $(this).parent().toggleClass("vote-bata")
    }),
    function(a) {
        a.fn.kslzy = function(b, c) {
            function d(c, d) {
                d = d || "visible";
                var e = a(c).closest(".spoiler");
                1 == e.length && (c = e);
                var g = f.height(),
                    h = f.scrollTop(),
                    i = a(c).offset().top,
                    j = a(c).height();
                return "visible" == d ? i < g + h + b && i > h - j - b : "above" == d ? i < g + h : void 0
            }

            function e() {
                var b = g.filter(function() {
                    return 0 != a(this).is(":visible") && d(a(this))
                });
                loaded = b.trigger("display"), g = g.not(loaded)
            }
            var f = a(window),
                g = this,
                b = b || 0;
            return this.one("display", function() {
                if (a(this).removeClass("mls-img").addClass("rjn-img"), "DIV" == a(this).context.tagName) {
                    a(this).hide(), a(this).fadeIn();
                    var b = a('<img class="lte-img">');
                    b.attr("src", a(this).attr("data-src")), b.appendTo(a(this))
                } else a(this).attr("src", a(this).attr("data-src")), a(this).removeAttr("data-src")
            }), f.on("scroll.kslzy resize.kslzy lookup.kslzy click.kslzy", e), e(), this
        }
    }(window.jQuery || window.Zepto), window.KaskusMap = function() {
        function a(a, b) {
            z = a, u = (b || {}).location, t = (b || {}).markerIcon, B = (b || {}).onSelected, v = new google.maps.Geocoder, w = new google.maps.places.AutocompleteService
        }

        function b(a) {
            return o(u.address).then(function(a) {
                return p({
                    placeId: a
                })
            })
        }

        function c() {
            return q().then(function(a) {
                return p({
                    location: a
                })
            })
        }

        function d(a) {
            if (!z) throw "Container element is not supplied";
            u = a, r = new google.maps.Map(z, {
                center: a && a.latLng,
                disableDefaultUI: !0,
                gestureHandling: "greedy",
                zoom: 15
            }), s = new google.maps.Marker({
                icon: t,
                map: r,
                position: a && a.latLng
            }), y = new google.maps.InfoWindow({
                maxWidth: 300
            }), y.open(r, s), y.setContent(a && a.address), e(), h()
        }

        function e() {
            f(), g()
        }

        function f() {
            var a = document.createElement("DIV");
            a.className += "c-map__search";
            var b = document.createElement("INPUT");
            b.setAttribute("type", "text"), b.setAttribute("placeholder", "Cari Lokasi");
            var c = document.createElement("BUTTON");
            c.setAttribute("type", "button"), c.innerHTML = "Ã—", c.onclick = function() {
                b.value = ""
            }, a.appendChild(b), a.appendChild(c), r.controls[google.maps.ControlPosition.TOP_LEFT].push(a), x = new google.maps.places.SearchBox(b)
        }

        function g() {
            A = document.createElement("BUTTON"), A.setAttribute("type", "button"), A.className += "c-map__confirm", A.innerHTML = "Gunakan Lokasi Ini", A.onclick = function() {
                u = {
                    latLng: {
                        lat: s.getPosition().lat(),
                        lng: s.getPosition().lng()
                    },
                    address: y.getContent()
                }, B(u)
            }, r.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(A)
        }

        function h() {
            r.addListener("bounds_changed", function() {
                x.setBounds(r.getBounds())
            }), r.addListener("center_changed", function() {
                s.setPosition(r.getCenter()), i() ? (k(), C()) : (y.setContent("Lokasi tidak sesuai dengan Alamat Pengiriman!"), A.setAttribute("disabled", !0))
            }), s.addListener("click", function() {
                y.open(r, s)
            }), x.addListener("places_changed", function() {
                var a = x.getPlaces();
                if (0 != a.length && a[0].geometry) {
                    var b = new google.maps.LatLngBounds;
                    a[0].geometry.viewport ? b.union(a[0].geometry.viewport) : b.extend(a[0].geometry.location), r.fitBounds(b)
                }
            })
        }

        function i() {
            if (u && u.latLngBounds) {
                return (new google.maps.LatLngBounds).union(u.latLngBounds).contains(s.getPosition())
            }
            return !0
        }

        function j() {
            p({
                location: s.getPosition()
            }).then(l).catch(m)
        }

        function k() {
            y.setContent("Memuat Lokasi..."), A.setAttribute("disabled", !0)
        }

        function l(a) {
            y.setContent(a.address), A.removeAttribute("disabled")
        }

        function m(a) {
            y.setContent("Gagal memuat lokasi. Silakan coba lagi"), A.setAttribute("disabled", !0), console.err(a)
        }

        function n(a) {
            return a.find(function(a) {
                return a.types.indexOf("administrative_area_level_3") >= 0
            })
        }

        function o(a) {
            return new Promise(function(b, c) {
                var d = {
                    input: a,
                    types: ["(cities)"],
                    componentRestrictions: {
                        country: "id"
                    }
                };
                w.getPlacePredictions(d, function(a, d) {
                    if (d === google.maps.places.PlacesServiceStatus.OK) {
                        var e = n(a) || a[0];
                        b(e.place_id)
                    } else c("Autocomplete was not successful for the following reason: " + d)
                })
            })
        }

        function p(a) {
            return new Promise(function(b, c) {
                v.geocode(a, function(a, d) {
                    if (d == google.maps.GeocoderStatus.OK) {
                        var e = a[0];
                        b({
                            latLngBounds: e.geometry.bounds || e.geometry.viewport,
                            latLng: e.geometry.location.toJSON(),
                            address: e.formatted_address
                        })
                    } else c("Geocode was not successful for the following reason: " + d)
                })
            })
        }

        function q() {
            return new Promise(function(a, b) {
                navigator.geolocation.getCurrentPosition(function(b) {
                    a({
                        lat: b.coords.latitude,
                        lng: b.coords.longitude
                    })
                }, function(a) {
                    b("Navigator error code: " + a.code)
                })
            })
        }
        var r, s, t, u, v, w, x, y, z, A, B, C = KaskusUtil.debounce(j, 1e3);
        return a.prototype.init = function() {
            (u ? b(u.address) : c()).then(d).catch(function(a) {
                d(), console.error(a)
            })
        }, a.prototype.setLocation = function(a) {
            u = a
        }, a.prototype.getLocation = function() {
            return u
        }, a.prototype.setMarkerIcon = function(a) {
            t = a
        }, a.prototype.setOnSelectedListener = function(a) {
            B = a
        }, a
    }(), $(function() {
        function a(a) {
            var b = $(a),
                d = b.data("submenuId"),
                e = $("#" + d);
            c.outerHeight(), c.outerWidth();
            e.css({
                display: "block"
            }), $(".listing-sidebar").hover(function() {
                $(this).addClass("hover").addClass("maintainHover")
            }, function() {
                $(this).removeClass("hover").removeClass("maintainHover")
            }), $(".hover-sidebar-content").height($(".tag-wrap").height() - 1), b.addClass("maintainHover hover"), b.mousedown(function() {
                b.on("mouseup mousemove", function a(c) {
                    "mouseup" === c.type ? $(e).css("display", "block") : $(e).css("display", "none"), b.off("mouseup mousemove", a)
                })
            }), startHover = $.now(), img = $(a).find(".b_sdbr"), preload = img.attr("data-src") || null, preload && (rsrc = img.attr("data-src"), img.attr("data-src", null), img.attr("src", rsrc))
        }

        function b(a) {
            var b = $(a),
                c = b.data("submenuId");
            $("#" + c).css("display", "none"), b.removeClass("maintainHover"), ($.now() - startHover) / 1e3 >= 1 && (cat_tag_name = $(a).find(".b_sdbr").attr("cat-tag-name"))
        }
        var c = $("#categories > ul , #forum-home-categories > ul , #fjb-home-categories > ul");
        c.menuAim({
            activate: a,
            deactivate: b,
            exitOnMouseOut: !0,
            submenuWrap: ".hover-sidebar-content"
        }), $(".listing-sidebar").click(function(a) {
            a.stopPropagation()
        }), $(".hover-sidebar-content").on("mouseup mousemove", function(a) {
            a.stopPropagation()
        })
    }), $(document).ready(function() {
        function a() {
            var a = ".jsSearchResult .jsSearchWrapper li:eq(" + indexSelected + ")",
                b = $(a).find("a").text();
            $("#search").val(b), $(a).addClass("is-selected"), $("#search").attr("value", b), $("#search").blur(), $("#search").focus()
        }

        function b() {
            $.cookie("display", "list");
            $.cookie("display", "list"), $(".product__listing").animate({
                opacity: 0
            }, function() {
                $(".grid__icon").removeClass("active"), $(".list__icon").addClass("active"), $(".product__listing .block-grid-lg-5").removeClass("block-grid-lg-5 block-grid-md-5 block-grid-sm-4 block-grid-xs-4"), $(".product__listing>div>ul").addClass("block-grid-xs-1"), $(".product__listing .product__item .item--grid").removeClass("item--grid"), $(".product__listing .product__item>div").addClass("item--list"), $(".product__listing").stop().animate({
                    opacity: 1
                })
            })
        }

        function c() {
            $.cookie("display", "grid");
            $.cookie("display", "grid"), $(".product__listing").animate({
                opacity: 0
            }, function() {
                $(".list__icon").removeClass("active"), $(".grid__icon").addClass("active"), $(".product__listing .block-grid-xs-1").removeClass("block-grid-xs-1"), $(".product__listing>div>ul").addClass("block-grid-lg-5 block-grid-md-5 block-grid-sm-4 block-grid-xs-4"), $(".product__listing .product__item .item--list").removeClass("item--list"), $(".product__listing .product__item>div").addClass("item--grid"), $(".product__listing").stop().animate({
                    opacity: 1
                })
            })
        }

        function d(a) {
            var b = 2,
                c = ",",
                d = ".";
            a = parseFloat(a);
            var e = a < 0 ? "-" : "",
                f = new String(a.toFixed(b));
            c.length && "." != c && (f = f.replace(/\./, c));
            var g = "",
                h = "",
                i = new String(f),
                j = c.length ? i.indexOf(c) : -1;
            for (j > -1 ? (j && (g = i.substr(0, j)), h = i.substr(j + 1)) : g = i, g && (g = String(Math.abs(g))); h.length < b;) h += "0";
            for (temparray = new Array; g.length > 3;) temparray.unshift(g.substr(-3)), g = g.substr(0, g.length - 3);
            return temparray.unshift(g), g = temparray.join(d), e + g
        }

        function e() {
            0 !== location.hash.length && window.scrollTo(window.scrollX, window.scrollY - 200)
        }

        function f() {
            $(".c-subforum-listing--desc").animate({
                opacity: 0
            }, function() {
                $(".o-icon--grid").removeClass("active"), $(".o-icon--list").addClass("active"), $(".c-subforum-listing--grid").hide(), $(".c-subforum-listing--list").show(), $(".c-subforum-listing--desc").stop().animate({
                    opacity: 1
                })
            })
        }

        function g() {
            $(".c-subforum-listing--desc").animate({
                opacity: 0
            }, function() {
                $(".o-icon--list").removeClass("active"), $(".o-icon--grid").addClass("active"), $(".c-subforum-listing--grid").show(), $(".c-subforum-listing--list").hide(), $(".c-subforum-listing--desc").stop().animate({
                    opacity: 1
                })
            })
        }
        $("#search").focusin(function() {
            $(".search-overlay").addClass("is-active"), $(".site-header--top").addClass("is-pop"), $(".site-header--bot").addClass("is-overlay"), $("#search-button, #btn-search").addClass("is-active"), $("body").addClass("o-hidden"), $("#jsRemoveOverlay").click(function(a) {
                $(".search-overlay").removeClass("is-active"), $(".site-header--top").removeClass("is-pop"), $(".site-header--bot").removeClass("is-overlay"), $("#search-button, #btn-search").removeClass("is-active"), $("body").removeClass("o-hidden")
            })
        }), $("#search").focusout(function() {
            $(".search-overlay").removeClass("is-active"), $(".site-header--top").removeClass("is-pop"), $(".site-header--bot").removeClass("is-overlay"), $("#search-button, #btn-search").removeClass("is-active"), $("body").removeClass("o-hidden")
        }), $("#signin-popup").on("shown.bs.modal", function() {
            $("#username").focus()
        }), $(".is-remove-all").mousedown(function(a) {
            a.preventDefault()
        }), $("#search").keydown(function(b) {
            $(".jsSearchResult").find("li.is-selected").removeClass("is-selected");
            var c = $(".jsSearchResult .jsSearchWrapper li").length - 1;
            if (38 == b.which) return indexSelected > 0 ? indexSelected-- : indexSelected = c, a(), !1;
            40 == b.which && (indexSelected < c ? indexSelected++ : indexSelected = 0, a())
        }), $(".feed-score").parents("body").addClass("user-forum-profile"), $(".flyout__trigger").length > 0 && $(".flyout__trigger").hover(function() {
            catLoaded || fetchCategories()
        }), "" !== linksearch && get_cat(searchchoice), $("input[name=searchchoice]").on("change", function() {
            $("#searchform").attr("action", "/search" + $(this).data("search")), $("#search_category").html("<option>Semua Kategori</option>"), $("#search_category").parent().find(".customSelectInner").text("Semua Kategori"), "fjb" === $(this).val() || "forum" === $(this).val() ? $("#search").css("width", "300px") : $("#search").css("width", "100%"), get_cat($(this).val())
        }), $("#search_category").on("change", function() {
            $(".select-category").find(".child_list").remove();
            var a = $(this).find("option:selected").attr("data-child-list");
            if (void 0 !== a) var b = a.split(",");
            for (var c in b) "-1" != b[c] && $(".select-category").append('<input type="hidden" class="child_list" name="forumchoice[]" value="' + b[c] + '">')
        }), $("#toggle-subforum").on("click", function(a) {
            a.preventDefault(), $$ = $(".header-list-sub"), $$.hasClass("hide-sub") ? ($$.removeClass("hide-sub"), $(this).find(".fa").attr("class", "fa fa-chevron-up")) : ($$.addClass("hide-sub"), $(this).find(".fa").attr("class", "fa fa-chevron-down"))
        }), $(window).scrollTop() > 0 && $(".site-header").addClass("scrolled"), "list" == $.cookie("display") ? b() : c(), $(".list__icon").click(function() {
            b()
        }), $(".grid__icon").click(function() {
            c()
        }), $(".lapak .item__detail .price i").click(function() {
            $(this).closest(".price").next(".price__field").show(), $(this).closest(".price").hide()
        }), $(".lapak .item__detail .price__field input").keypress(function(a) {
            13 == a.which && (a.preventDefault(), $(this).closest(".price__field").siblings(".price").show(), $(this).closest(".price__field").hide())
        }), $(".slider__highlight").slick({
            autoplay: !0,
            dots: !0,
            customPaging: function(a, b) {
                var c = document.createElement("A");
                c.setAttribute("onclick", $(a.$slides[b]).data("onclick"));
                var d = $(a.$slides[b]).data("options");
                return d && $.each(d, function(a, b) {
                    c.setAttribute(a, b)
                }), c.appendChild(document.createTextNode($(a.$slides[b]).data("thumb"))), c.outerHTML
            },
            responsive: [{
                breakpoint: 500,
                settings: {
                    dots: !1,
                    arrows: !1,
                    infinite: !1,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        }), $(".slider__grid").on("init", function(a, b) {
            $(".slider__grid .slick-slide.slick-active:first .grid__image").css("margin-left", "-5px"), $(".slider__grid .slick-slide.slick-active:first .grid__caption").css("margin-left", "-5px"), $(".slider__grid .slick-slide.slick-active:last .grid__image").css("margin-left", "5px"), $(".slider__grid .slick-slide.slick-active:last .grid__caption").css("margin-left", "5px")
        }), $(".slider__grid").on("afterChange", function(a, b, c) {
            $(".slider__grid .slick-slide.slick-active:first .grid__image").css("margin-left", "-5px"), $(".slider__grid .slick-slide.slick-active:first .grid__caption").css("margin-left", "-5px"), $(".slider__grid .slick-slide.slick-active:last .grid__image").css("margin-left", "5px"), $(".slider__grid .slick-slide.slick-active:last .grid__caption").css("margin-left", "5px")
        }), $(".slider__grid").slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: !0
        }), "undefined" == typeof slickShowcaseInitialized && $(".slider__grid--six").slick({
            infinite: !0,
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: !0
        }), $("#map-modal1").on("shown.bs.modal", function() {
            $(".slideshow-photos").show(), $(".slideshow-photos").slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: !0,
                nextArrow: '<div class="slick-next"><i class="fa fa-angle-right"></i></div>',
                prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left"></i></div>'
            })
        }), $(".slider__highlight").show(), $(".slider__grid").show();
        var h = $("#offer-price").text();
        h = h.replace(".", ""), h = parseInt(h), $('input[type="range"]').rangeslider({
            polyfill: !1,
            rangeClass: "rangeslider",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            onInit: function() {},
            onSlide: function(a, b) {
                b <= 5e3 ? ($("#id-range").attr("step", 1e3), $("#id-range2").attr("step", 1e3)) : b > 5e3 && b < 3e4 ? ($("#id-range").attr("step", 5e3), $("#id-range2").attr("step", 5e3)) : b >= 3e4 && b < 2e5 && ($("#id-range").attr("step", 1e4), $("#id-range2").attr("step", 1e4)), $("#js-output").css("left", a).text(d(b)), $("#price-control").val(b), $("#js-output2").css("left", a).text(d(b)), $("#price-control2").val(b)
            },
            onSlideEnd: function(a, b) {
                celengan = b, $("#the-price").text(d(h + celengan)), $("#celengan-range").attr("value", celengan), $("#the-price2").text(d(h + celengan)), $("#celengan-range").attr("value", celengan)
            }
        }), $("#price-control").change(function(a) {
            $('input[type="range"]').val($(this).val()).change()
        }), $("#price-control2").change(function(a) {
            $('input[type="range"]').val($(this).val()).change()
        }), $(".mls-img").kslzy(300), $("body.fjb #tags").tagsInput({
            height: "80px",
            width: "100%",
            defaultText: "Tambahkan",
            placeholderColor: "#b7b7b7"
        }), $("#datepicker-calendar").DatePicker({
            inline: !0,
            calendars: 2,
            mode: "range",
            onChange: function(a, b) {
                $("#date-range-field span").html(a[0].getDate() + "/" + (a[0].getMonth(!0) + 1) + "/" + a[0].getFullYear() + " - " + a[1].getDate() + "/" + (a[1].getMonth(!0) + 1) + "/" + a[1].getFullYear())
            }
        }), $("#dp2").datepicker().on("changeDate", function(a) {
            $("#dp2").datepicker("hide")
        }), $(".form-date").datepicker().on("changeDate", function(a) {
            $(".form-date").datepicker("hide")
        }), $("#date-range").bind("click", function() {
            return $("#datepicker-calendar").toggle(), $("#date-range-field").toggleClass("open"), $("#search-keyword").removeClass("open"), !1
        }), $("html").click(function() {
            $("#datepicker-calendar").is(":visible") && ($("#datepicker-calendar").hide(), $("#date-range-field").removeClass("open"))
        }), $("#datepicker-calendar").click(function(a) {
            a.stopPropagation()
        }), $(".check-select").change(function() {
            $(this).prop("checked") ? $(this).closest(".thumbnail").addClass("selected") : $(this).closest(".thumbnail").removeClass("selected")
        }), $(".thumbnail").hover(function() {
            img = $(this).find(".img-hover"), "#" === img.attr("src") && img.attr("src", img.attr("data-large"))
        }), $("#shipping-img").zoom(), $(".image-product-detail").each(function(a) {
            $(this).find(".carousel-largeimage").zoom({
                callback: function() {
                    $(".zoomImg").width() <= 400 ? $(".zoomImg").css({
                        visibility: "hidden",
                        cursor: "default"
                    }) : $(".zoomImg").css({
                        visibility: "visible",
                        cursor: "all-scroll"
                    })
                }
            });
            var b = "slider" + a;
            b = $(this).find(".carousel-thumb").lightSlider({
                enableDrag: !1,
                autoWidth: !0,
                pager: !1,
                easing: "cubic-bezier(0.25, 0, 0.25, 1)",
                controls: !0,
                slideMove: 1,
                slideMargin: 0
            }), $(this).find(".prev-thumb").click(function() {
                b.goToPrevSlide()
            }), $(this).find(".next-thumb").click(function() {
                b.goToNextSlide()
            }), $(this).find(".carousel-fjb").find(".thumbnail").on("click", function() {
                largeTarget = $(this).closest(".image-product-detail").find(".carousel-largeimage"), $$ = $(this), $(this).siblings().removeClass("active"), $$.addClass("active"), largeTarget.find("img").attr("src", $$.find("img").attr("data-large"))
            })
        });
        $(".accordion > dd").hide();
        if ($(".accordion > dd").first().show(), $(".accordion > dt").first().addClass("active"), $(".escrow .accordion > dd").first().hide(), $(".escrow .accordion > dt").first().removeClass("active"), $(".accordion.autoexpand > dd").show(), $(".accordion.autoexpand > dt").addClass("active"), $(".accordion > dt").click(function() {
                var a = $(this),
                    b = a.next();
                return $(".accordion > dt.active").not(a.toggleClass("active")).removeClass("active"), a.siblings("dd").not(b.addClass("active").slideToggle()).slideUp(), !1
            }), $("#tab-info-lapak li a").click(function() {
                $("#tab2 .accordion > dd").first().show(), $("#tab2 .accordion > dt").first().addClass("active"), $("#tab4 .accordion > dd").first().show(), $("#tab4 .accordion > dt").first().addClass("active")
            }), $(".head-categories-title").click(function() {
                checkArrow()
            }), $(window).on("resize", function() {
                $(window).width() > 1024 && ($("#left-nav").removeClass("full-show"), $("#bgover").remove())
            }), $("#home-categories").children("div").addClass("show-five"), $(".sidebar-trigger").on("click", function() {
                $("#left-nav").toggleClass("full-show"), $(".hover-sidebar-content").height($(".tag-wrap").height())
            }), $(".sortable").sortable({
                items: ":not(.disabled)"
            }), $("#sidebar-category").sortable().bind("sortupdate", function() {
                var a = $("#sidebar-category > li").map(function() {
                    if ($(this).attr("data-submenu-id")) {
                        return "tag_id[]=" + $(this).attr("data-submenu-id").split("-")[2]
                    }
                    return null
                }).get();
                $.ajax({
                    url: urlSaveTagOrder,
                    type: "post",
                    data: a.join("&"),
                    success: function() {},
                    error: function() {
                        alert("Please try again")
                    }
                })
            }), $("#home-categories").length < 1 && $(".hover-sidebar-content").height($(".tag-wrap").height()), $(".event-calendar, .scrolling-con-update").mCustomScrollbar({
                advanced: {
                    updateOnContentResize: !0,
                    autoScrollOnFocus: !1
                }
            }), $("#wts-tab .step li").cycle(2500, "active"), $("#be-buyer-tab .step li").cycle(2500, "active"), $("select.select").customSelect(), $(".modal").on("shown.bs.modal", function(a) {
                $(".select").trigger("render")
            }), $(".tooltips").tooltip(), $(".popovers").popover({
                trigger: "hover"
            }), $("#reply-messsage").markItUp(kaskusBbcodeSettings).focus(), $(".brand-con .brand").each(function(a, b) {
                $(this).width(Math.floor($(".brand-con").width() / $(".brand-con .brand").length) - 1)
            }), $("#search").focus(function(a) {
                $(".global-search").addClass("large")
            }), $("#search").blur(function(a) {
                $(".global-search").removeClass("large")
            }), $(".badges .user-badge>div .badge").bind("webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend", function() {
                $(this).removeClass("swing")
            }), $(".badges .user-badge>div .badge").hover(function() {
                $(this).addClass("swing")
            }), $(".must-number").keydown(function(a) {
                -1 !== $.inArray(a.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 == a.keyCode && !0 === a.ctrlKey || a.keyCode >= 35 && a.keyCode <= 39 || (a.shiftKey || a.keyCode < 48 || a.keyCode > 57) && (a.keyCode < 96 || a.keyCode > 105) && a.preventDefault()
            }), $("ul#filter_list").has("li").length > 0 && ($("#div_filter").css("display", "block"), $("#clear_filter").css("display", "inline-block")), $(".back-to-top, .back-top").bind("click", function(a) {
                $(window).scrollTop() < 40 || $("html, body").animate({
                    scrollTop: 0
                }, 500)
            }), $(".main-content-full").length && $("#bottom-leaderboard").children().attr("style", ""), $("#search-result").length && $("#search-result").height() < $("#refine-search").height() && $("#search-result").find("tbody").height($("#refine-search").height() - 98), $('<div id="floating_notice" class="header-notification-wrap visible"><div class="header-notification"><span id="notice_span"></span></div></div>').appendTo(".site-header").hide(), $("input, textarea").placeholder(), $(".verified-seller-form").hide(), $("#button-form-verified-seller").click(function() {
                $(".verified-seller-trigger").hide(), $(".verified-seller-form").show()
            }), $(".verified-seller-form input[type='text']").focusin(function() {
                $(".input-helper").show()
            }), $(".verified-seller-form input[type='text']").focusout(function() {
                $(".input-helper").hide()
            }), $("#landing-hot-review").find(".item").each(function() {
                var a = $(this).next();
                a.length || (a = $(this).siblings(":first")), a.children(":first-child").clone().appendTo($(this));
                for (var b = 0; b < 1; b++) a = a.next(), a.length || (a = $(this).siblings(":first")), a.children(":first-child").clone().appendTo($(this))
            }), $(".career-page").length) {
            var i = document.location.toString();
            i.match("#") && $(".career-page .nav-tabs a[href=#" + i.split("#")[1] + "]").tab("show"), $(".career-page .nav-tabs a").on("shown", function(a) {
                window.location.hash = a.target.hash
            }), $(".career-page .nav-tabs a").click(function(a) {
                window.location.hash = a.target.hash
            }), $(".career-page").length && $(window).on("hashchange", function() {
                e()
            })
        }
        $(".cat-selection").chosen({
            search_contains: !0,
            no_results_text: "Salah kali, gan!"
        }), $("#catlevel1").chosen({
            search_contains: !0,
            no_results_text: "Kategori tidak ada, Gan!"
        }), $("#catlevel1").change(function() {
            $("#catlevel2").show(), $("#catlevel2").chosen({
                search_contains: !0,
                no_results_text: "Kategori tidak ada, Gan!"
            })
        }), $(".alamat-selection").chosen({
            no_results_text: "Alamat tidak ditemukan, gan!"
        }), $(".no-search").chosen({
            disable_search_threshold: 10
        }), $(".related-thread").find("a").click(function() {
            _gaq.push(["_trackEvent", "more like this", "click", this.href])
        });
        var j = $.now();
        $(".trfc").hover(function() {
                j = $.now()
            }, function() {
                if (($.now() - j) / 1e3 >= 1) {
                    var a = $(this).attr("cat-tag-name");
                    _gaq.push(["_trackPageview", "/bannercategories/" + a])
                }
            }),
            $(".nav-promo").find("img").addClass("trfc"), $(".hover-sidebar-content").on("mouseup mousemove", function(a) {
                a.stopPropagation()
            }), $(function() {
                $(document).on("mousemove", "textarea", function(a) {
                    var b = $(this).offset().top + $(this).outerHeight() - 16,
                        c = $(this).offset().left + $(this).outerWidth() - 16;
                    $(this).css({
                        cursor: a.pageY > b && a.pageX > c ? "nwse-resize" : ""
                    })
                }).on("keyup", "textarea", function(a) {
                    $(this).height($(this).height() + this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")) - $(this).outerHeight())
                })
            }), $(".category-list__slider").slick({
                infinite: !1,
                slidesToShow: 1,
                slidesToScroll: 1
            }), $(".category-list__slider").show();
        var k = $(".js-showMore"),
            l = 'Selengkapnya <i class="fa fa-chevron-down"></i>';
        k.click(function() {
            $(this).html() == l ? ($(this).html('Tutup <i class="fa fa-chevron-up"></i>'), $(this).parent().prev().css("height", "auto"), $(this).prev(".c-detail__btn__grad").toggle()) : ($(this).html(l), $(this).parent().prev().css("height", "45px"), $(this).prev(".c-detail__btn__grad").toggle())
        }), $('[data-toggle="tooltip"]').tooltip({
            animation: !0
        }), $(".o-icon--list").click(function() {
            f()
        }), $(".o-icon--grid").click(function() {
            g()
        }), $(".pass-trigger").click(function() {
            $(this).find(".pass-icon-eye").hasClass("icon-eye-closed") ? ($(this).find(".pass-icon-eye").addClass("icon-eye-opened").removeClass("icon-eye-closed"), $(".pass-input-control").prop("type", "text")) : ($(this).find(".pass-icon-eye").addClass("icon-eye-closed").removeClass("icon-eye-opened"), $(".pass-input-control").prop("type", "password"))
        });
        var m = new Date,
            n = !1,
            o = (new Date(m.getFullYear(), m.getMonth(), m.getDate(), 0, 0, 0, 0), $(".jsStartDate").datepicker({
                onRender: function(a) {
                    return ""
                }
            }).on("changeDate", function(a) {
                var b = new Date(a.date);
                b.setDate(b.getDate() + 1), p.setValue(b), o.hide(), $(".jsEndDate")[0].focus()
            }).data("datepicker")),
            p = $(".jsEndDate").datepicker({
                onRender: function(a) {
                    return a.valueOf() <= o.date.valueOf() ? "disabled" : ""
                }
            }).on("changeDate", function(a) {
                p.hide(), n = !0
            }).data("datepicker"),
            q = $(".c-forgot-password--recovery-code input");
        q.focus(function() {
            $(this).select()
        }), q.eq(0).focus(), q.keyup(function(a) {
            var b = $(this).val(),
                c = q.index(this);
            16 != a.keyCode && 9 != a.keyCode && (1 == b.length && 7 !== c && (c += 1, q.eq(c).focus()), checkButton()), 8 != a.keyCode && 46 != a.keyCode || (0 != c && "" == $(this).val() ? q.eq(c - 1).focus() : $("#submit-button").addClass("btn-grey").removeClass("btn-blue"))
        }), checkButton()
    }), $(".textarea-block").on("focus", function() {
        $(".control-hidden").show()
    }), $(".pass-form__btn").click(function() {
        $(this).find(".pass-form__icon").hasClass("ic-eye-close") ? ($(this).find(".pass-form__icon").addClass("ic-eye-open").removeClass("ic-eye-close"), $(".pass-form__input").prop("type", "password")) : ($(this).find(".pass-form__icon").addClass("ic-eye-close").removeClass("ic-eye-open"), $(".pass-form__input").prop("type", "text"))
    }), $(".suggest__link").click(function() {
        $("#inputusername").val($(this).text())
    });
var leftOffset = {
    "#fjb-thread-kondisi-barang": 180,
    "#fjb-thread-lokasi": -220,
    "#fjb-thread-filter-lengkap": -330
};
if ($('a[data-target*="#fjb-thread-"]').on("click", function() {
        var a = $(this).attr("data-target");
        $(".modal-thread-list" + a + " .modal-focus").css("left", $(this).offset().left), $(".modal-thread-list" + a + " .modal-triangle").css("left", $(this).offset().left + 258), $(".modal-thread-list" + a + " .modal-content").css("left", $(this).offset().left + leftOffset[a]), window.scrollTo(0, 572)
    }), checkObject($(".jsCanvasCapture"))) var cameraOn = {},
    cameraGranted = {},
    isMirrored = !1,
    canvas = document.querySelector(".jsCanvasCapture"),
    context = canvas.getContext("2d");
$.fn.isVisible = function() {
    var a = $(window).scrollTop(),
        b = a + $(window).height(),
        c = $(this).offset().top;
    return c + $(this).height() <= b && c >= a
};
var StatusControlStick = !1,
    forumControl = $(".postlist").eq(0),
    userControlStick = $(".user-control-stick"),
    header = $(".site-header"),
    windowPanel = $(window),
    sidebar = $(".sidebar-wrap"),
    footer = $(".site-footer"),
    leftnav = $("#left-nav"),
    relatedThread = $(".related-thread"),
    momod = $(".momod-frame"),
    kaskusStore = $(".kaskus-store"),
    limitControlStick = $(".nor-post").first(),
    batasScrollBawah = $(".sidebar-wrap > div:last-child");
batasScrollAtas = $(".main-bar"), landingMain = $(".home-landing-main"), landingMainBar = $(".main-bar"), skyScrapper = $(".skin-banner"), leaderBanner = $(".leader-banner"), mediaQuery = window.matchMedia("(min-width: 1025px)");
var createListingPreview = $(".create-preview");
checkObject(momod) && (heightright = momod.offset().top), checkObject(kaskusStore) && (heightright = kaskusStore.offset().top), checkObject(batasScrollBawah) && (heightright = batasScrollBawah.offset().top), checkObject(batasScrollAtas) && (batasAtas = batasScrollAtas.offset().top), $(".flyout__category__list").bind("scroll", function() {
    checkScroller($(this))
}), $(".flyout__subscribed__list").bind("scroll", function() {
    checkScroller($(this))
}), $(".flyout__result__list").bind("scroll", function() {
    checkScroller($(this))
}), $(".flyout__category-children__list").bind("scroll", function() {
    checkScroller($(this))
}), $(window).bind("scroll", function() {
    borderHeader(), mainNavigationHeader(), checkObject($(".landing")) && stickSidebarLanding(), checkObject(skyScrapper) && stickSkyScrapper(), checkObject($(".invoice-sidebar")) && stickyInvoiceSidebar(), checkObject($(".order-sidebar")) && stickyOrderInfoSidebar(), checkObject(momod) && stickSidebar(), checkObject($(".user-control-stick")) && ControlStick(), checkObject($(".kaskus-ads .kasad-h")) && relatedContent(), checkObject($(".hot-thread-wrap")) && stickSidebarHot(), checkObject($(".create-listing__back-to-top")) && stickyCreateListingBackToTop(), $(".site-header").css("left", -$(this).scrollLeft() + "px"), $(".user-control-stick").css("left", 106 - $(this).scrollLeft() + "px"), windowPanel.width() < 1025 && $(".user-control-stick").css("left", 107 - $(this).scrollLeft() + "px")
}), checkObject($(".landing")) && stickSidebarLanding(), checkObject(skyScrapper) && stickSkyScrapper(), checkObject($(".hot-thread-wrap")) && stickSidebarHot(), checkObject(momod) && stickSidebar(), checkObject($(".user-control-stick")) && ControlStick(), mainNavigationHeader(), $(".user-control-stick").css("left", 106 - $(this).scrollLeft() + "px"), checkObject($(".kaskus-ads .kasad-h")) && relatedContent(), $(document).ready(function() {
    initSticky()
}), checkObject($("#kaskus-store")) && kstore_widget(), $("#send-share-mail").on("click", function(a) {
    emailtext = $("#share-from").val(), multiEmail(emailtext)
});
