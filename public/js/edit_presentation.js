var hover_slide = -1;
function actionPos(new_hover = -1) {
    if (hover_slide != new_hover) {
        var hover_slide_dom = $('.slide:nth-child(' + new_hover + ')');
        var offset = hover_slide_dom.position();
        $('div.actions').css({ top: offset.top + hover_slide_dom.height() + 6, left: offset.left });
        hover_slide = new_hover;
    }
}
function previewSlide(id) {
    id = id + 1;
    $('.preview').html('<img class="img-fluid" src="/html_mock-up/presentation-slide-example/slide-' + id + '.jpg">');
}
actionPos($('.slide').length);
$('.slide').mouseenter(function () {
    actionPos(1 + $(".slide").index($(this)));
});
$('.slide').click(function () {
    previewSlide($(".slide").index($(this)));
});
$('.slide:last-child').mouseenter();
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$('.presentation').on('click', 'button', function (e) {
    e.preventDefault();
    console.log('add to slide ' + $(this).attr('id') + ' position ' + hover_slide);
});