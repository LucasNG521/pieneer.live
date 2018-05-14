var presentation = {};
$.ajax({
    dataType: "json",
    contentType: "application/json",
    type: 'GET',
    url: "/sample_api/presentation/get_id.json",
    success: init_event
});

function init_event(data) {
    presentation = data;
    console.log(presentation);
    // TODO: dyn map
    // TODO: dyn vcf link
    var html_info=`<p>Description: ${presentation.title}</p>
    <p>${presentation.date}</p>
    <p>📍 ${presentation.location}</p>
    <div class="text-center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7974310464824!2d114.14924791540757!3d22.28566198533119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007c40b40001%3A0x959df826b8e21b02!2snaked+Hub+Bonham+Strand+Coworking+Space+Hong+Kong!5e0!3m2!1sen!2shk!4v1525244511538"
        frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <p>Speaker: ${presentation.speaker}</p>
    <p>
        <a href="mailto:${presentation.email}">
            <i class="fas fa-envelope fa-lg"></i> ${presentation.email}
        </a>
    </p>
    <p>
        <a href="tel:${presentation.phone}">
            <i class="fas fa-phone fa-lg"></i> ${presentation.phone}
        </a>
    </p>
    <p>
        <a href="/presentation/${presentation.id}/contact.vcf">
            <i class="fas fa-download fa-lg"></i> Add contact to my phone
        </a>
    </p>`;
    $('#info .container').html(html_info);
    
}

var name = (typeof $.cookie("name") == 'undefined') ? '' : $.cookie("name");
$('#myModal').on('show.bs.modal', function (e) {
    $('#name').val(name);
});
$('#myModal').on('hide.bs.modal', function (e) {
    if (name == '') {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
});
$('#form-name').submit(function (e) {
    e.preventDefault();
    $('.savename').click();
    return false;
});
$('.savename').click(function () {
    if ($('#name').val() != '') {
        name = $('#name').val();
        $.cookie("name", name, { expires: 365, path: '/' });
        $('#myModal').modal('hide');
    }
});
$('.questions').on('click', '.fa-thumbs-up', function (e) {
    e.preventDefault();
    var thumbs_up = ($(this).text() == '') ? 0 : parseInt($(this).text());
    if ($(this).hasClass('liked') && thumbs_up === 1) {
        $(this).text('');
    } else if ($(this).hasClass('liked')) {
        $(this).text(thumbs_up - 1);
    } else {
        $(this).text(thumbs_up + 1);
    }
    $(this).toggleClass('liked');
});
$('#send_question').submit(function (e) {
    e.preventDefault();
    var question = $('#question').val();
    if (question != '') {
        var html_question = `<li class="list-group-item">
                    <div class="user">
                        <i class="far fa-user"></i> ${name}
                    </div>
                    <div class="question d-flex align-items-center justify-content-center">
                        ${question}
                        <div class="ml-auto justify-content-end">
                            <a href="#" alt="Like">
                                <i class="fas fa-thumbs-up fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </li>`;
        $('.questions').append(html_question);
        $('#question').val('');
        scrollDown();
    }
});
function scrollDown() {
    $('html, body').animate({ scrollTop: $('.questions')[0].scrollHeight }, 0);
}
if (name == '')
    $('#myModal').modal('show');




