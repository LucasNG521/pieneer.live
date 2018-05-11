var hover_slide = -1;
var upload = [];
function actionPos(new_hover = -1) {
    if (hover_slide != new_hover) {
        var hover_slide_dom = $('.slide').eq(new_hover);
        var offset = hover_slide_dom.position();
        $('div.actions').css({ top: offset.top + $('.list')[0].scrollTop + hover_slide_dom.height() + 6, left: 37 });
        hover_slide = new_hover;
    }
}
function previewSlide(slide_id) {
    $('.slide.active').removeClass('active');
    $('.slide').eq(slide_id).addClass('active');
    console.log('prev' + slide_id);
    if ($('.slide').eq(slide_id).hasClass('slide-html')) {
        var slide_html = `
        <form class="container mt-5" action="/api/event" method="POST" id="form-infos">
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="title">Title</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" name="title" value="Presentation title" id="title">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="location">Location</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" name="location" value="Hong Kong" id="location">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="date">Date</label>
                <div class="col-sm-10">
                    <input class="form-control date" type="text" name="date" value="2018/05/10 15:43" id="date">
                </div>
            </div>
            <button type="submit" class="btn btn-primary save-infos">Save</button>
        </form>
`;
        $('.preview').html(slide_html);
        $('.date').datetimepicker({ startDate: new Date() });
    } else if ($('.slide').eq(slide_id).hasClass('slide-image')) {
        $('.preview').html($('.slide').eq(slide_id).html());
    } else if ($('.slide').eq(slide_id).hasClass('slide-poll')) {
        $('.preview').html($('.slide').eq(slide_id).html());
    } else if ($('.slide').eq(slide_id).hasClass('slide-qa')) {
        $('.preview').html($('.slide').eq(slide_id).html());
    }
}
function insertImage(link) {
    $('.slide').eq(hover_slide).after(`
        <div class="slide slide-image">
            <img src="${link}">
        </div>`);
    hover_slide++;
}
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

// init
actionPos(0);
$('.slide').eq(0).click();

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

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$('.save-infos').click(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/event/1', // id
        type: 'POST',
        data: JSON.stringify($('#form-infos').serializeFormJSON()),
        dataType: "json",
        contentType: "application/json"
    }).then((data) => {
        console.log('user infos updated');
    });
});