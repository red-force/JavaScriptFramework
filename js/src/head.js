/* jshint laxcomma: true, evil: true*/
jQuery(document).ready(function() {
		try {
			$(document).bind("contextmenu", function() {
					return !1
				}), window.Event && (void 0 !== document.addEventListener ? document.addEventListener("mouseup", (Event || MouseEvent).MOUSEUP) : void 0 !== document.attachEvent ? document.attachEvent("mouseup", (Event || MouseEvent).MOUSEUP) : void 0 !== document.captureEvents && document.captureEvents(Event.MOUSEUP));
			var t = function() {
				var t = window.event || window.Event || window.MouseEvent || null;
				return null !== t && (t.cancelBubble = !0), !1
			}, e = function(t) {
					if (window.Event) {
						if (2 == t.which || 3 == t.which) return !1
					} else if (2 == event.button || 3 == event.button) return event.cancelBubble = !0, event.returnvalue = !1, !1
				};
			document.oncontextmenu = t, document.onmousedown = e
		} catch (n) {}
	}), jQuery(document).ready(function() {
		try {
			var t = function(t) {
				"function" == typeof jQuery && t instanceof jQuery && (t = t[0]);
				var e = t.getBoundingClientRect();
				return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth)
			}, e = function(t) {
					var e, n, i, o = t;
					"function" == typeof jQuery ? (t instanceof jQuery ? t = t[0] : o = $(t), e = t.getBoundingClientRect(), n = window.innerHeight || document.documentElement.clientHeight, i = window.innerWidth || document.documentElement.clientWidth, o.css("position", "fixed"), (e.top < 0 || e.top > (n - e.height) / 2) && o.css("top", (n - e.height) / 2), e.height > n && o.css("top", "0px"), (e.left < 0 || e.left > (i - e.width) / 2) && o.css("left", (i - e.width) / 2), e.width > i && o.css("left", "0px")) : (e = t.getBoundingClientRect(), n = window.innerHeight || document.documentElement.clientHeight, i = window.innerWidth || document.documentElement.clientWidth, t.style.position = "fixed", (e.top < 0 || e.top > (n - e.height) / 2) && (t.style.top = (n - e.height) / 2), e.height > n && (t.style.top = 0), (e.left < 0 || e.left > (i - e.width) / 2) && (t.style.left = (i - e.width) / 2), e.width > i && (t.style.left = 0))
				};
			$(window).on("scroll", function() {
					$(".keep_in_sight_at_botw").each(function(e) {
							try {
								var n = $(this),
									i = n.attr("id") || "keep_in_sight_at_botw_" + e;
								if (!1 === t(n)) $('<span id="' + i + '_keep_in_sight_at_botw"></span>').css({
											position: n.css("position"),
											top: n.css("top"),
											bottom: n.css("bottom"),
											left: n.css("left"),
											right: n.css("right")
										}).insertBefore(n), n.css({
											position: "fixed",
											top: n.css("top"),
											bottom: "0px",
											left: n.css("left"),
											right: n.css("right")
										});
								else {
									var o = $("#" + i + "_keep_in_sight_at_botw");
									null !== o && !0 === t(o) && (n.css({
												position: o.css("position"),
												top: o.css("top"),
												bottom: o.css("bottom"),
												left: o.css("left"),
												right: o.css("right")
											}), o.remove())
								}
							} catch (s) {}
						}), $(".keep_in_sight_at_motw").each(function(t) {
							try {
								var n = $(this);
								n.attr("id") || "keep_in_sight_at_motw_" + t, e(n)
							} catch (i) {}
						})
				}), $(window).on("resize", function() {
					$(".keep_in_sight_at_botw").each(function(e) {
							try {
								var n = $(this),
									i = n.attr("id") || "keep_in_sight_at_botw_" + e;
								if (!1 === t(n)) $('<span id="' + i + '_keep_in_sight_at_botw"></span>').css({
											position: n.css("position"),
											top: n.css("top"),
											bottom: n.css("bottom"),
											left: n.css("left"),
											right: n.css("right")
										}).insertBefore(n), n.css({
											position: "fixed",
											top: n.css("top"),
											bottom: "0px",
											left: n.css("left"),
											right: n.css("right")
										});
								else {
									var o = $("#" + i + "_keep_in_sight_at_botw");
									null !== o && !0 === t(o) && (n.css({
												position: o.css("position"),
												top: o.css("top"),
												bottom: o.css("bottom"),
												left: o.css("left"),
												right: o.css("right")
											}), o.remove())
								}
							} catch (s) {}
						}), $(".keep_in_sight_at_motw").each(function(t) {
							try {
								var n = $(this);
								n.attr("id") || "keep_in_sight_at_motw_" + t, e(n)
							} catch (i) {}
						})
				})
		} catch (n) {}
	});
