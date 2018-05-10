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