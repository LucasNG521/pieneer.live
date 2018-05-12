var hover_slide = -1;
var upload = [];
function actionPos(new_hover = -1) {
    if (hover_slide != new_hover) {
        var hover_slide_dom = $('.slide').eq(new_hover);
        var offset = hover_slide_dom.position();
        hover_slide = new_hover;
        var left = (hover_slide == 0) ? 37 : 16;
        $('div.actions').css({ top: offset.top + $('.list')[0].scrollTop + hover_slide_dom.height() + 6, left: left });
        if (hover_slide == 0) {
            $('#delete-slide').hide();
        } else {
            $('#delete-slide').show();
        }
    }
}
function previewSlide(slide_id) {
    $('.slide.active').removeClass('active');
    $('.slide').eq(slide_id).addClass('active');
    console.log('prev' + slide_id);
    if ($('.slide').eq(slide_id).hasClass('slide-html')) {
        var slide_html = `
        <form class="container mt-5" action="/api/event" method="POST" id="form-infos">
            <h2><i class="fas fa-info-circle mr-2 mb-5"></i>Infos</h2>
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
            <div>
                <button type="submit" class="btn btn-primary save-infos float-right">Save</button>
            </div>
        </form>
`;
        $('.preview').html(slide_html);
        $('.date').datetimepicker({ startDate: new Date() });
    } else if ($('.slide').eq(slide_id).hasClass('slide-image')) {
        $('.preview').html($('.slide').eq(slide_id).html());
    } else if ($('.slide').eq(slide_id).hasClass('slide-poll')) {
        var slide_html = `
        <form class="container mt-5" action="/api/event" method="POST" id="form-poll">
            <h2><i class="fas fa-chart-bar mr-2 mb-5"></i>Poll</h2>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label font-weight-bold" for="question">Question</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" name="question" value="Poll question" id="question">
                </div>
            </div>
            <div class="form-group row mt-5">
                <label class="col-sm-2 col-form-label text-right" for="answer">Answer A</label>
                <div class="col-sm-10 pl-5">
                    <input class="form-control answer" type="text" name="answer[]" value="Answer 1">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label text-right" for="answer">Answer B</label>
                <div class="col-sm-10 pl-5">
                    <input class="form-control answer" type="text" name="answer[]" value="Answer 2">
                </div>
            </div>
            <div>
                <button class="btn btn-info add-answer" type="button" title="Add answer">
                    <i class="fas fa-plus-square"></i> Add answer
                </button>
                <button type="submit" class="btn btn-primary save-poll float-right">Save</button>
            </div>
        </form>
`;
        $('.preview').html(slide_html);
    } else if ($('.slide').eq(slide_id).hasClass('slide-qa')) {
        var slide_html = `
        <form class="container mt-5" action="/api/event" method="POST" id="form-poll">
            <h2><i class="fas fa-question-circle mr-2 mb-5"></i>Q&A</h2>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="title">Q&A title</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" name="title" value="Q&A" id="title">
                </div>
            </div>
            <div>
                <button type="submit" class="btn btn-primary save-qa float-right">Save</button>
            </div>
        </form>
`;
        $('.preview').html(slide_html);
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
    } else if ($(this).attr('id') == 'insert-poll') {
        $('.slide').eq(hover_slide).after(`
        <div class="slide slide-poll">
            <div>
                <i class="fas fa-chart-bar fa-2x mr-2"></i>Poll
            </div>
        </div>`);
        $('.slide').eq(1 + hover_slide).click();
    } else if ($(this).attr('id') == 'insert-qa') {
        $('.slide').eq(hover_slide).after(`
        <div class="slide slide-qa">
            <div>
                <i class="fas fa-question-circle fa-2x mr-2"></i>Q&A
            </div>
        </div>`);
        $('.slide').eq(1 + hover_slide).click();
    } else if ($(this).attr('id') == 'delete-slide') {
        $('.slide').eq(hover_slide).remove();
        // hover_slide --;
        // $('.slide').eq(hover_slide).mouseenter();
        if(hover_slide==$('.slide').length) {
            $('.slide').eq(hover_slide-1).mouseenter().click();
        } else {
            $('.slide').eq(hover_slide).click();
        }
    }
    $(this).blur();
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

$('.preview').on('click', '.save-infos', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/event/1', // id
        type: 'POST',
        data: JSON.stringify($('#form-infos').serializeFormJSON()),
        dataType: "json",
        contentType: "application/json"
    }).then((data) => {
        console.log('infos updated');
    });
});

$('.preview').on('click', '.add-answer', function (e) {
    var letter = String.fromCharCode("A".charCodeAt() + $('.answer').length);
    if ($('.answer').length < 6) {
        $(this).before(`
        <div class="form-group row">
            <label class="col-sm-2 col-form-label text-right" for="answer">Answer ${letter}</label>
            <div class="col-sm-10 pl-5">
                <input class="form-control answer" type="text" name="answer[]" value="">
            </div>
        </div>`);
        if ($('.answer').length == 6) {
            $('.add-answer').hide();
        }
    }
});

$('.preview').on('click', '.save-poll', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/poll/1', // id
        type: 'POST',
        data: JSON.stringify($('#form-poll').serializeFormJSON()),
        dataType: "json",
        contentType: "application/json"
    }).then((data) => {
        console.log('poll updated');
    });
});