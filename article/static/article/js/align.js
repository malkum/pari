// Temporary workaround until wagtail 1.5 is released
$(function() {
    $(".richtext").on("click", function() {
	      var $this = $(this);
	      $(".hallotoolbar .hallojustify button[title]").on("click", function() {
	          var alignment = $(this).attr("title").toLowerCase();
            var sel = rangy.getSelection();
            var block, blockElements = [], blockElRegex = /p|h[1-6]|blockquote|ol|ul/i;
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0);
                var container = $(range.startContainer);
                var el = container.get(0);
                if (el && el.tagName && el.tagName.match(blockElRegex)) {
                    blockElements.push(el);
                }
                if (blockElements.length === 0) {
                    if (range.collapsed === true) {
                        var parents = container.parents();
                        for (var ii=0; ii < parents.length; ii++) {
                            el = parents[ii];
                            if (el.tagName.match(blockElRegex)) {
                                blockElements.push(el);
                                break;
                            }
                        }
                    } else {
                        blockElements = range.getNodes([1], function(el) {
                            return blockElRegex.test(el.tagName);
                        });
                    }
                }
                for (var ii=0; ii < blockElements.length; ii++) {
                    block = blockElements[ii];
	                  $(block).removeClass("center left right justify");
	                  $(block).addClass(alignment);
                }
	              $this.trigger("hallomodified", [{content: $this.html()}]);
	              $this.addClass("isModified");
            }
	      });
    });

    var RTL_LANGUAGES = ["ur"];

    // For RTL languages, change the richtext direction
    $("#id_language").on("change", function() {
        if ($.inArray($(this).val(), RTL_LANGUAGES) !== -1) {
            $(".richtext").attr("dir", "rtl");
        } else {
            $(".richtext").attr("dir", "auto");
        }
    });
    $("#id_language").trigger("change");

    var openedWindows = [];
    if (typeof window._open === 'undefined') {
        window._open = window.open;
        window.open = function(url, name, params) {
            var win = window._open(url, name, params);
            openedWindows.push(win);
            return win;
        }
    }
    $(".action-preview").on("click", function() {
        var $this = $(this);
        // For RTL languages in preview
        if ($.inArray($("#id_language option:selected").val(), RTL_LANGUAGES) !== -1) {
            setTimeout(function() {
                previewWindow = openedWindows.slice(-1)[0];
                if (previewWindow) {
                    var previewDoc = previewWindow.document;
                    $(previewDoc).find("#preview-frame").on("load", function() {
                        $(this).get(0).contentDocument.querySelector("html").setAttribute("dir", "rtl");
                    });
                }
            }, 500);
        }
    });

    initialize_tiny_editor();
    setTimeout(function() {
        style_editor();
    }, 1000);


});

var initialize_tiny_editor = function () {
    $('.action-add-block-paragraph_with_block_quote').on("click",function () {
        setTimeout(function() {
            style_editor();
        }, 100);
    });

    $('.action-add-block-paragraph').on("click",function () {
        setTimeout(function() {
            style_editor();
        }, 100);
    });

}

var style_editor =function () {
    var editorElement = $(".mce-edit-area").find("iframe").contents().find("html");


    var body = editorElement.find("body");
    body.css("font-family","Roboto Slab, Georgia, serif");
    body.css("font-size","1.0em");
    body.css("font-weight","300");
    body.css("line-height","1.5em");
    body.css("background", "#fafafa");
    $(".mce-container").css("background", "#fafafa");

}

