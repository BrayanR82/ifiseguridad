var respuestas = [];
var branch;
var slidesShowed = [];
slidesShowed.push('slide-1');
var slidesConfig = getConfig();
var multipleAnswers = {}
var actualSlide = '';
var cp = '';

var defaultOrigin = "vsure_misstracking";

function useVerticalProgress() {
    var width = window.innerWidth || $(window).width();
    return width <= 768 || width > 1023;
}

var lpType = gup('lpType');
if (lpType == "") {
    lpType = 'no-lp';
}

var _all_answers = {
    'Vivienda': '01',
    'Negocio': '02',
    'Vivienda habitual': '03',
    'Segunda vivienda': '04',
    'Piso': '05',
    'Chalet': '06',
    'Piso bajo': '07',
    'Piso intermedio': '08',
    'Ático': '09',
    'Chalet individual': '10',
    'Adosado': '11',
    'Pareado': '12',
    'Jardín o parcela': '13',
    'Balcón o Terraza': '14',
    'No tiene': '15',
    'Siempre hay alguien': '16',
    'Menos de 2 horas al día': '17',
    'Entre 2 y 5 horas al día': '18',
    'Más de 5 horas al día': '19',
    'Voy una o dos veces al año': '20',
    'Voy en vacaciones': '21',
    'Voy los fines de semana': '22',
    'Soy propietario': '23',
    'Vivo de alquiler': '24',
    'XXXXX': '25',
    'Sí': '26',
    'No': '27',
    'Sí, de Verisure': '28',
    'Sí, de otra compañía': '29',
    'Negocio a pie de calle': '30',
    'Local en centro comercial': '31',
    'Nave en polígono industrial': '32',
    'Oficina en edificio empresarial': '33',
    'Dentro del núcleo urbano': '34',
    'Fuera del núcleo urbano': '35',
    'Solo yo': '36',
    'De 2 a 5 empleados': '37',
    'Más de 5 empleados': '38',
    'Solo mañanas': '39',
    'Solo tardes': '40',
    'Mañanas y tardes': '41',
    'Nocturno': '42',
    '24 horas': '43',
    'Gran valor': '44',
    'Medio valor': '45',
    'Bajo valor': '46',
    'XXX XXX XXX': '47'
};

var cadena2 = gup('camp');
if (cadena2 == '') {
    cadena2 = defaultOrigin;
}

window.mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function setDeviceSize() {
    if (window.innerWidth <= 600) {
        return true;
    } else {
        return false;
    }
}

function setOrigin(origin) {
    origin = origin + '_cotizaciones';
    if ((mobilecheck() || setDeviceSize()) && origin.indexOf('_m_') < 0) {
        origin = origin.replace('_cotizaciones', '_m_cotizaciones');
    }
    $('#sdasunto').val('EMAIL - ' + origin);
    $('#sdOrigen').val(origin);
    $('#sdMailOrigen').val(origin);
}

function allInfo() {

    var _respuestas = $('.pulse').find('input');
    var _all_cadena = [];
    var _all_cadena_string = '';

    $(_respuestas).each(function () {
        if (_all_answers[$(this).val()] != null) {
            _all_cadena.push(_all_answers[$(this).val()]);
            _all_cadena_string += _all_answers[$(this).val()];
        }
    });

    return (_all_cadena_string);
}

function sendLead(name, preg) {
    var form = preg.closest('.funnel-q').find('form');
    var nombre = (name || '').trim();
    var email = form.find('input[name="email"]').val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre.length < 2) {
        $('.error-message').remove();
        preg.closest('.funnel-q').append('<div class="error-message">Por favor, introduce tu nombre<div>');
        return false;
    }

    if (!emailRegex.test(email || '')) {
        $('.error-message').remove();
        preg.closest('.funnel-q').append('<div class="error-message">Por favor, introduce un correo valido<div>');
        return false;
    }

    preg.closest('.funnel-q').addClass('sending');
    $('.error-message').remove();

    var orderedAnswers = [];
    $('.funnel-q .pulse input').each(function () {
        var article = $(this).closest('article');
        var slideId = article.attr('id');
        var config = slidesConfig[slideId] || {};
        orderedAnswers.push({
            slide: slideId,
            question: config.pregunta || article.find('.funnel-q__title').text().trim(),
            answer: $(this).val()
        });
    });

    var payload = {
        marca: 'IFI Seguridad',
        rama: branch,
        nombre: nombre,
        email: email,
        codigoPostal: cp || '',
        respuestas: orderedAnswers,
        resumen: orderedAnswers.map(function (item) {
            return item.question + ': ' + item.answer;
        }).join('\n')
    };

    $.ajax({
        url: 'https://formspree.io/f/mpqkovrj',
        method: 'POST',
        data: payload,
        dataType: 'json',
        headers: {
            'Accept': 'application/json'
        }
    }).done(function () {
        preg.closest('.funnel-q').removeClass('sending');
        form.html('<div class="funnel-q__title" style="margin:0;">Gracias. Hemos recibido tu solicitud y te contactaremos pronto.</div>');
        $('.funnel-progress__bar-fill').css(useVerticalProgress() ? 'height' : 'width', '100%');
        $('.funnel-progress__time').html(0);
    }).fail(function () {
        preg.closest('.funnel-q').removeClass('sending');
        preg.closest('.funnel-q').append('<div class="error-message">No se pudo enviar ahora. Intentalo de nuevo en unos segundos.<div>');
    });
}

$(document).ready(function () {

    // calcular tiempo y barra de progreso según hogar o negocio
    var qNum;
    var contador;
    var difTime;
    var qAnswered;
    var stepNo = 1;

    $('body').addClass('loaded');

    // asegurar que el documento empieza arriba del todo al cargar
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    $(window).scrollTop(0);

    if ($.fn.magnificPopup) {
        $('.popup-link').magnificPopup({
            type: 'inline',
            midClick: false,
            removalDelay: 300,
            fixedContentPos: true,
            fixedBgPos: true,
            mainClass: 'mfp-fade'
        });
    }

    //calcular el incremento de tiempo y distancia segun hogar o negocio
    $('#slide-1 .funnel-q__a').click(function () {
        if ($(this).find('label').text().indexOf('Negocio') >= 0) {
            qNum = 9;
            $('body').addClass('answering-negocio');
            branch = 'Negocio';
        } else {
            qNum = 11;
            $('body').removeClass('answering-negocio');
            branch = 'Vivienda';
        }
        contador = Math.floor(100 / qNum);
        difTime = Math.floor(60 / qNum);
    });

    // cosas de la calculadora anterior

    dataLayer.push({ 'lpType': lpType });

    if (mobilecheck() || setDeviceSize()) {
        dispositivo = 'mobile';
    } else {
        dispositivo = 'desktop';
    }

    function backTimeBar(qu) {
        // Contar solo las respuestas realmente dadas (elementos con clase .pulse)
        qAnswered = $('.pulse').length + 1;
    }

    function incrementBar(dimension, btn) {
        backTimeBar(btn);
        var increment = contador * qAnswered;
        $('.funnel-progress__bar-fill').css(dimension, increment + '%');

        var tickParent = $('.funnel-progress li');
        var tick = tickParent.find('.funnel-progress__tick');
        if (useVerticalProgress()) {
            if (increment < 33) {
                tick.hide();
            } else if (33 <= increment && increment < 66) {
                tick.hide();
                tickParent.eq(0).find('.funnel-progress__tick').show();
            } else if (66 <= increment && increment < 100) {
                tickParent.eq(1).find('.funnel-progress__tick').show();
                tickParent.eq(2).find('.funnel-progress__tick').hide();
            } else if (100 <= increment) {
                tickParent.eq(2).find('.funnel-progress__tick').show();
            }
        }
    }

    function lessTime(q) {
        backTimeBar(q);
        var funnelTime = $('.funnel-progress__time');
        var funnelTimeHtml = funnelTime.html(); // 60
        if (parseInt(funnelTimeHtml) > 0) {
            if (q.closest('.funnel-q').hasClass('funnel-input__end')) {
                funnelTime.html(0);
            } else {
                funnelTime.html(60 - (qAnswered * difTime));
            }
        } else {
            funnelTime.html(0);
        }
    }

    // esto nose si deberia ir aqui
    function pushDataLayer(step) {
        if (branch == 'Negocio') {
            dataLayer.push({ 'event': 'paginaVirtual2', 'eventCategory': '/test/funnel/negocio' + step });
        }
        else {
            dataLayer.push({ 'event': 'paginaVirtual2', 'eventCategory': '/test/funnel/hogar' + step });
        }
    }

    function dlSlide(slide) {
        actualSlide = slidesConfig[slide.attr('id')];
        slidesShowed.push(slide.attr('id'));
        pushDataLayer(stepNo);
        pushNewDataLayer(stepNo, slide.attr('id'));
        stepNo++;
    }

    function progressAll(el) {
        qAnswering(el);
        lessTime(el);
        if (useVerticalProgress()) {
            incrementBar('height', el);
        } else {
            incrementBar('width', el);
        }
                if (el.find('label').text().indexOf('Negocio') >= 0) {
          dlSlide($('.negocio-first').first());
        } else {
          dlSlide(el.closest('.funnel-q').nextAll('.in-path').first());
        }
    }

    // click en respuesta estándar
     $('.funnel-single .funnel-q__a').click(function () {
         if (!$(this).closest('.funnel-q').hasClass('answered')) {
             respuestas.push($(this).find('input').val());
             checkIfIsEditing($(this));
             removeInPathClass($(this));
             progressAll($(this));
             $(this).addClass('pulse active');
                    // Mostrar botón de atrás si hay respuestas
                    if ($('.pulse').length > 0) {
                        $('.back-button-container').show();
                    }
         }
     });

    // click en respuesta múltiple
    $('.funnel-multiple .funnel-q__a').click(function () {
        var multipleBtn = $(this).parent().next('.funnel-multiple__btn').find('.funnel-btn');
        $(this).toggleClass('pulse');
        if ($(this).parent().find('.pulse').length !== 0) {
            multipleBtn.removeClass('disabled');
        } else {
            multipleBtn.addClass('disabled');
        }
    });

    //preguntas multi choice
    $('.funnel-multiple__btn .funnel-btn').click(function () {
        // tuplas y array respuestas
        var multipleA = [];
        var responseMultiple = "";
        var pulsedA = $(this).closest('.funnel-q').find('.pulse');
        pulsedA.each(function () {
            multipleA.push($(this).find('input').val());
        });
        responseMultiple = multipleA.toString();
        respuestas.push(responseMultiple);

        $(this).closest('.funnel-q').find('.active').removeClass('active');
        //si tenemos más de una respuesta, agruparlas en un solo elemento
        if (pulsedA.length > 1) {
            pulsedA.first().addClass('active');
            setTimeout(function () {
                pulsedA.first().find('label').text('+' + pulsedA.length + ' respuestas');
            }, 900);
        } else {
            pulsedA.addClass('active');
        }
        //pasar al botón el tip de la respuesta contestada, en el caso de que sean varias le pasa el primero
        pulsedA.each(function () {
            $(this).closest('.funnel-q').find('.funnel-btn').removeAttr('data-tip');
            if ($(this).attr('data-tip') !== undefined) {
                $(this).closest('.funnel-q').find('.funnel-btn').attr('data-tip', $(this).attr('data-tip'));
                return false;
            }
        });
        checkIfIsEditing($(this))
        progressAll($(this));
        $(this.target).unbind("click");
            // Mostrar botón de atrás
            if ($('.pulse').length > 0) {
                $('.back-button-container').show();
            }
    });

    // click en código postal
    $('.funnel-input__next .funnel-btn').click(function (e) {
        cp = $(this).closest('.funnel-input__next').find('input').val();
        e.preventDefault();
        if (validatePostalCode(cp)) {
            $('.error-message').remove();
            checkIfIsEditing($(this));
            progressAll($(this));
            respuestas.push($(this).closest('.funnel-input__next').find('input').val());
        } else {
            writeError('cp', $(this));
        }
    });

    // postal code validation
    $('input[name="cpostal"]').on('input', function () {
        if (validatePostalCode($(this).val())) {
            $(this).siblings('button').removeAttr('disabled')
            $(this).siblings('button').removeClass('disabled')
        } else {
            $(this).siblings('button').attr('disabled', true)
            $(this).siblings('button').addClass('disabled')
        }
    });

    // name + email validation
    $('input[name="nombre"], input[name="email"]').on('input', function () {
        var parentForm = $(this).closest('form');
        var name = parentForm.find('input[name="nombre"]').val();
        var email = parentForm.find('input[name="email"]').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var button = parentForm.find('.funnel-btn');

        if ((name || '').trim().length >= 2 && emailRegex.test(email || '')) {
            button.removeAttr('disabled');
            button.removeClass('disabled');
        } else {
            button.attr('disabled', true);
            button.addClass('disabled');
        }
    });

    // click en datos de contacto
    $('.funnel-input__end .funnel-btn').click(function (e) {
        e.preventDefault();
        var nombre = $(this).closest('.funnel-input__end').find('input[name="nombre"]').val();
        respuestas.push($(this).closest('.funnel-input__end').find('input[name="email"]').val());
        sendLead(nombre, $(this));
    });

    // click en botón de atrás
    $('#back-btn').click(function (e) {
        e.preventDefault();

        // La pregunta a reabrir es la ultima ya contestada y visible
        var editableArticle = $('.funnel-q.answered:visible').last();
        if (editableArticle.length === 0) {
            $('.back-button-container').hide();
            return;
        }

        // Rehabilitar todas las ramas para que al volver se pueda elegir de nuevo
        $('article').not('.in-path').addClass('in-path');

        // Limpiar respuestas desde la pregunta que se va a editar en adelante
        editableArticle.find('.pulse').removeClass('pulse active');
        editableArticle.find('input:checked').prop('checked', false);
        editableArticle.removeClass('answered');

        // Restaurar etiquetas en preguntas multiple cuando fueron resumidas a '+N respuestas'
        editableArticle.find('.funnel-q__a label').each(function () {
            var original = $(this).next('input').val();
            if (original) {
                $(this).text(original);
            }
        });

        var followingArticles = editableArticle.nextAll('article');
        followingArticles.find('.pulse').removeClass('pulse active');
        followingArticles.find('input:checked').prop('checked', false);
        followingArticles.removeClass('answered');
        followingArticles.hide();

        editableArticle.show();

        // Sincronizar array auxiliar de respuestas con el estado real del DOM
        respuestas = [];
        $('.funnel-q .pulse input').each(function () {
            respuestas.push($(this).val());
        });

        // Actualizar progreso
        var dimension = useVerticalProgress() ? 'height' : 'width';
        var increment = contador * $('.pulse').length;
        $('.funnel-progress__bar-fill').css(dimension, increment + '%');

        // Scroll a la pregunta editable
        $('html, body').animate({
            scrollTop: Math.max(0, editableArticle.offset().top - 100)
        }, 300);

        // Mostrar u ocultar boton segun queden respuestas previas
        if ($('.pulse').length === 0) {
            $('.back-button-container').hide();
        } else {
            $('.back-button-container').show();
        }
    });
});

function hideTip(tip) {
    tip.removeClass('animate');
    tip.find('p').hide();
    tip.hide();
}
function showTip(tip) {
    tip.fadeIn(100);
    tip.addClass('animate');
    setTimeout(function () {
        tip.find('p').show(300);
    }, 700);
}

function checkIfIsEditing(element) {
    if (element.hasClass('funnel-btn')) {
        hideTip(element.closest('.funnel-q').find('.funnel-q__tip'));
        hideTip(element.closest('.funnel-q').nextAll('.funnel-q').find('.funnel-q__tip'));
        element.closest('.funnel-q').nextAll('.funnel-q').hide();
        element.closest('.funnel-q').nextAll('.funnel-q').find('.funnel-q__a').removeClass('active pulse');
        var articleId = element.closest('article').attr('id')
        var articleIdNumber = 0;
        if (articleId.indexOf('-') >= 0) {
            articleIdNumber = articleId.substr(articleId.indexOf('-') + 1)
        }
        if (multipleAnswers[articleIdNumber] != null) {
            sendEventToDatalayer(articleId)
        } else {
            multipleAnswers[articleIdNumber] = true
        }
    } else {
        var justPulsed = element.siblings('.pulse');
        var justTip = element.closest('article').find('.funnel-q__tip');
        if (justPulsed.length > 0) {
            justPulsed.removeClass('active pulse');
            hideTip(justTip);
            var id = element.closest('article').attr('id');
            $('article').not('.in-path').addClass('in-path');
            $('#' + id + ' ~ article').each(function () {
                $(this).find('.pulse').removeClass('pulse');
                $(this).find('.active').removeClass('active');
                hideTip($(this).find('.funnel-q__tip'));
            });
            $('#' + id).prevAll('article').each(function () {
                removeInPathClass($(this).find('.pulse').first());
            });
            $('#' + id + " ~ article").hide();
            sendEventToDatalayer(id)
        }
    }
}

function sendEventToDatalayer(slide) {
    var question = slidesConfig[slide] != null ? slidesConfig[slide]['dl_shortQuestion'] : 'undefined'
    var articleIdNumber = 0
    dataLayer.push({
        "event": "answerEdited",
        "question": question
    });
    if (slide != null && slide.indexOf('-') >= 0) {
        articleIdNumber = slide.substr(slide.indexOf('-') + 1)
    }
    var keysToRemove = []
    Object.keys(multipleAnswers).forEach(function (key) {
        if (parseInt(articleIdNumber) < parseInt(key)) {
            keysToRemove.push(key)
        }
    });
    keysToRemove.forEach(function (key) { delete multipleAnswers[key] });
}

function createTuplas() {
    var previousMultipleParent = null
    $('.pulse').each(function () {

        if ($(this).closest('article').hasClass('funnel-multiple')) {
            var multipleParent = $(this).closest('article').attr('id')
            if (multipleParent !== previousMultipleParent) {
                createMultipleEDSTupla($(this));
                previousMultipleParent = multipleParent
            }
        } else {
            createEDSTupla($(this));
        }
    });
}

function getAnswers() {
    var tuplas = $( "input[value*='|']" ).first().nextAll('input')
    var answers = []
    tuplas.each(function( index ) {
    if(tuplas[index].name.indexOf('etiqueta') >=0){
        answers.push({'tag':$(tuplas[index]).val(), 'value':$(tuplas[index + 1]).val()})
    }
    });

    return answers;
}

function qOpened() {
  /*  $('.answered').removeClass('answered');
    $('.funnel-input__end').prev().removeClass('hidden');
    $('.funnel-multiple label').each(function () {
        $(this).text($(this).next('input').val());
    });*/
}

function qShow(q, distance) {
    $('html, body').animate({
        scrollTop: distance
    }, 500);
    if (q.find('label').text() === 'Negocio') {
        $('.negocio-first').show();
    } else {
        q.closest('.funnel-q').nextAll('.in-path').first().show();
    }
    q.closest('.funnel-q').addClass('answered');
}

function removeInPathClass(element) {
    var _originalSlidesConfig = getConfig();
    var questionId = element.closest('article').attr('id');
    if (_originalSlidesConfig[questionId] != null) {
        if (_originalSlidesConfig[questionId]['remove-from-path'] != null) {
            var id = element.children('input').first().attr('id');
            var answer = '';
            if (_originalSlidesConfig[questionId]) {
                answer = Object.keys(_originalSlidesConfig[questionId].respuestas)[id.substr(id.length - 1) - 1];
            }
            var slidesToRemove = _originalSlidesConfig[questionId]['remove-from-path'][answer];
            $.each(slidesToRemove, function (index, value) {
                $('#' + value).removeClass('in-path');
            });
        }
    }
}