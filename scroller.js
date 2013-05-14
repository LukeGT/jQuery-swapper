define('plugin/scroller', [
    'jquery',
    'exports'
], function(
    $,
    exports
) {

    function outerHTML($el) {
        return $el.clone().wrap('<p>').parent().html();
    }

    exports.textScroll = function($target, oldText, newText, direction) {
        var $old = $('<span/>').text(oldText);
        var $new = $('<span/>').text(newText);
        exports.htmlScroll($target, $old, $new, direction);
    };

    exports.htmlScroll = function($target, $old, $new, direction) {

        var $parent = $target.parent();
        var params = {};

        if (direction == 'up') {
            params = { top: outerHTML($old), bottom: outerHTML($new) };

        } else if (direction == 'down') {
            params = { bottom: outerHTML($old), top: outerHTML($new) };
        }

        $target.replaceWith(stash.plugin.scroller(params));

        var $textScroll = $parent.find('.scroller');
        var $slider = $textScroll.find('> span');
        var $insides = $slider.find('> span');
        var $first = $($insides[0]);
        var $second = $($insides[1]);

        if (direction == 'up') {
            $textScroll.height($first.height());
            $slider.width($first.width());

        } else if (direction == 'down') {
            $textScroll.height($second.height());
            $slider
                .width($second.width())
                .css({top: - $second.position().top});
        }

        var animateTo;

        if (direction == 'up') {
            animateTo = { top: -$second.position().top, width: $second.width() };

        } else if (direction == 'down') {
            animateTo = { top: 0, width: $first.width() };
        }

        $slider.animate(animateTo, function() {
            $textScroll.replaceWith($new);
        });
    };
});