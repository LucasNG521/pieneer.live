var hover_slide = -1;
var upload = [];
function actionPos(new_hover = -1) {
    console.log(new_hover);
    if (hover_slide != new_hover) {
        var hover_slide_dom = $('.slide').eq(new_hover);
        console.log(hover_slide_dom);
        var offset = hover_slide_dom.position();
        $('div.actions').css({ top: offset.top + $('.list')[0].scrollTop + hover_slide_dom.height() + 6, left: 37 });
        hover_slide = new_hover;
    }
}
function previewSlide(slide_id) {
    console.log('prev' + slide_id);
    // type image:
    $('.preview').html($('.slide').eq(slide_id).html());
}
function insertImage(link) {
    $('.slide').eq(hover_slide).after(`
        <div class="slide slide-image">
            <img src="${link}">
        </div>`);
    hover_slide++;
}
actionPos(0);
previewSlide(0);
$('.list').on('mouseenter', 'div.slide', function (e) {
    actionPos($(".slide").index($(this)));
});
$('.list').on('click', 'div.slide', function (e) {
    previewSlide($(".slide").index($(this)));
});
$('.slide:last-child').mouseenter();
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$('.presentation').on('click', 'button', function (e) {
    e.preventDefault();
    console.log('add to slide ' + $(this).attr('id') + ' position ' + hover_slide);
    if ($(this).attr('id') == 'insert-ppt') {
        upload = [];
        $('#uploadPPTModal').modal('show', {
            keyboard: true
        });
    } else if ($(this).attr('id') == 'insert-image') {
        upload = [];
        $('#uploadImageModal').modal('show');
    }
});

// upload files
Dropzone.options.myDropzonePpt = {
    acceptedFiles: ".ppt,.pptx",
    init: function () {
        this.on("success", function (file, file_name) {
            if (file_name != 'undefined') {
                upload.push(file_name);
                console.log('upload complete');
                console.log(file_name);
            } else {
                console.log('upload error');
            }
        });
    }
};
Dropzone.options.myDropzoneImage = {
    acceptedFiles: "image/jpeg,image/png",
    init: function () {
        this.on("success", function (file, file_name) {
            if (file_name != 'undefined') {
                upload.push(file_name);
                console.log('upload complete');
                console.log(file_name);
            } else {
                console.log('upload error');
            }
        });
    }
};
$('.insert-ppt').click(function () {
    for (var img of upload) {
        insertImage('/slides/' + img);
    }
    upload = [];
    $('#uploadPPTModal').modal('hide');
});
$('.insert-image').click(function () {
    for (var img of upload) {
        insertImage('/slides/' + img);
    }
    upload = [];
    $('#uploadImageModal').modal('hide');
});