function createTupla(tag, value, category) {
    var tuplasPosition = $('input[name^="tuplas"]').length / 4;
    $('<input>').attr({
        type: 'hidden',
        name: 'tuplas[' + tuplasPosition + '][etiqueta]',
        value: tag
    }).appendTo('#frmSolicitud');
    $('<input>').attr({
        type: 'hidden',
        name: 'tuplas[' + tuplasPosition + '][valor]',
        value: value
    }).appendTo('#frmSolicitud');
    $('<input>').attr({
        type: 'hidden',
        name: 'tuplas[' + tuplasPosition + '][categoria]',
        value: category
    }).appendTo('#frmSolicitud');
    $('<input>').attr({
        type: 'hidden',
        name: 'tuplas[' + tuplasPosition + '][orden]',
        value: tuplasPosition
    }).appendTo('#frmSolicitud');
}

function createEDSTupla(element) {
    var questionId = element.closest('article').attr('id')
    var _originalSlidesConfig = getConfig()
    var question = getQuestionText(questionId, _originalSlidesConfig);
    var id = element.children('input').first().attr('id');
    var answer = ''
    if (_originalSlidesConfig[questionId]) {
        answer = Object.keys(_originalSlidesConfig[questionId].respuestas)[id.substr(id.length - 1) - 1]
    }

    createTupla(question, answer, 'EDS')
}

function getQuestionText(questionId, _originalSlidesConfig) {
    var questionNameTupla = ''
    var questionText = ''
    if (_originalSlidesConfig[questionId] != null) {
        questionNameTupla = _originalSlidesConfig[questionId].dl_shortQuestion
        questionText = _originalSlidesConfig[questionId].pregunta
    }
    return questionNameTupla + '|' + questionText
}

function createMultipleEDSTupla(element) {
    // agrupar respuestas multiples
    var questionId = element.closest('article').attr('id')
    var answer = ''
    var article = element.closest('article');
    article.find('.pulse').each(function (index) {
        if (answer !== '') {
            answer += ','
        }
        answer += $(this).find('input').first().val()
    })
    var _originalSlidesConfig = getConfig()
    var question = getQuestionText(questionId, _originalSlidesConfig);
    createTupla(question, answer, 'EDS')
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    if (!isNaN(exdays))
        exdate.setDate(exdate.getDate() + exdays);
    else
        exdays = null;
    var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function validatePostalCode(value) {
    var re = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
    return re.test(value);
}

function validateTelephon(value) {
    var re = /^[9|6|7|8]{1}([\d]{2}[-]*){3}[\d]{2}$/;
    value = value.replace(' ', '');
    return re.test(value);
}

function inFakeList(tfo, callback) {
    var peticion = $.ajax({
        type: 'POST',
        url: '../app/Functions/checkFakeList.php',
        dataType: 'json',
        data: { 'tfo': tfo },
        success: callback
    });
}

function writeError(caso, input) {
    var inputError = input.closest('.funnel-q');
    $('.error-message').remove();

    switch (caso) {
        case 'fakelist':
            dataLayer.push({
                'error': 'Blacklist',
                'event': 'funnelError'
            });
            inputError.append('<div class="error-message">El teléfono es erróneo, por favor introduzca un número de teléfono válido<div>');
            break
        case 'no-valido':
            dataLayer.push({
                'error': 'Not Valid',
                'event': 'funnelError'
            });
            inputError.append('<div class="error-message">Por favor, introduzca un número de teléfono válido<div>');
            break
        case 'duplicated':
            dataLayer.push({
                'error': 'Duplicated',
                'event': 'funnelError'
            });
            inputError.append('<div class="error-message">Ya has introducido este teléfono para guardar tu proyecto de seguridad. Por favor, introduce otro número de teléfono<div>');
            break
        case 'cp':
            inputError.append('<div class="error-message">Por favor, introduzca un código postal válido<div>');
            break
    }
}

function getUniqueId() {
    var id_random = Math.floor(Math.random() * 99) + 1;
    id_random = ("0" + id_random).slice(-2);
    var id_prev = new Date().getTime().toString();
    var id = id_prev + id_random;
    return id;
}

function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);
    if (results == null)
        return "";
    else
        return results[1];
}

function getConfig() {

    return {
        'slide-1': {
            "pregunta": "¿Que tipo de propiedad deseas proteger?",
            "respuestas": {
                "Vivienda": "slide-2",
                "Negocio": "slide-16"
            },
            "dl_shortQuestion": "funnelType",
            "dl_stepBlock": 'aboutYourInstallation'
        },
        "slide-2": {
            "pregunta": "¿Es su vivienda habitual o segunda vivienda?",
            "respuestas": {
                "Vivienda habitual": "slide-3",
                "Segunda vivienda": "slide-3"
            },
            "remove-from-path": {
                "Vivienda habitual": ["slide-6"],
                "Segunda vivienda": ["slide-5", "slide-7"]
            },
            "dl_step": "1",
            "dl_type": "home",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelFrequencyLiving",
            "dl_virtuaPage": "/funnel/home/step1/funnelFrequencyLiving"
        },
        "slide-3": {
            "pregunta": "¿Cómo es su vivienda?",
            "respuestas": {
                "Piso": "slide-4a",
                "Chalet": "slide-4b"
            },
            "remove-from-path": {
                "Piso": ["slide-3b"],
                "Chalet": ["slide-3a"]
            },
            "dl_step": "2",
            "dl_type": "home",
            "dl_shortQuestion": "funnelHouseType",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_virtuaPage": "/funnel/home/step2/funnelHouseType"
        },
        "slide-3a": {
            "pregunta": "¿Cómo es tu piso?",
            "respuestas": {
                "Piso bajo": "slide-4",
                "Piso intermedio": "slide-4",
                "Ático": "slide-4"
            },
            "remove-from-path": {
                "Piso bajo": [],
                "Piso intermedio": ["slide-4"],
                "Ático": []
            },
            "dl_step": "3",
            "dl_type": "home",
            "dl_shortQuestion": "funnelFlatType",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_virtuaPage": "/funnel/home/step3/funnelFlatType"
        },
        "slide-3b": {
            "pregunta": "¿Cómo es tu chalet?",
            "respuestas": {
                "Chalet individual": "slide-4",
                "Adosado": "slide-4",
                "Pareado": "slide-4"
            },
            "dl_step": "3",
            "dl_type": "home",
            "dl_shortQuestion": "funnelChaletType",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_virtuaPage": "/funnel/home/step3/funnelChaletType"
        },
        "slide-4": {
            "pregunta": "¿Tiene accesos secundarios?",
            "respuestas": {
                "Jardín o parcela": "slide-5",
                "Balcón o terraza": "slide-5",
                "No tiene": "slide-5"
            },
            "dl_step": "4",
            "dl_type": "home",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelSecondaryAccess",
            "dl_virtuaPage": "/funnel/home/step4/funnelSecondaryAccess"
        },
        "slide-5": {
            "pregunta": "¿Cuánto tiempo pasa vacía?",//TODO: REVISAR LITERAL POR EL MODELO ANTERIORMENTE ¿Cuánto tiempo permanece la casa inhabitada?
            "respuestas": {
                "Más de 5 horas al día": "slide-6",
                "Entre 2 y 5 horas al día": "slide-6",
                "Menos de 2 horas al día": "slide-6",
                "Siempre hay alguien": "slide-6"
            },
            "dl_step": "5",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelTimeInhabitedHouse",
            "dl_virtuaPage": "/funnel/home/step5/funnelTimeInhabitedHouse"
        },
        "slide-6": {
            "pregunta": "¿Cuánto tiempo pasa la vivienda deshabitada?",
            "respuestas": {
                "Voy una o dos veces al año": "slide-7",
                "Voy en vacaciones": "slide-7",
                "Voy los fines de semana": "slide-7"
            },
            "dl_step": "6",
            "dl_type": "home",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelHouseRemainUninhabited",
            "dl_virtuaPage": "/funnel/home/step6/funnelHouseRemainUninhabited"
        },
        "slide-7": {
            "pregunta": "¿La vivienda es de tu propiedad?",
            "respuestas": {
                "Soy propietario": "slide-8",
                "Vivo de alquiler": "slide-8"
            },
            "dl_step": "7",
            "dl_type": "home",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelHouseProperty",
            "dl_virtuaPage": "/funnel/home/step7/funnelHouseProperty"
        },
        "slide-8": {
            "pregunta": "¿Cual consideras que es el nivel de riesgo de la zona?",
            "respuestas": {
                "Bajo (zona tranquila)": "slide-9",
                "Medio (urbano)": "slide-9",
                "Alto (aislado o conflictivo)": "slide-9"
            },
            "dl_step": "8",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelRiskLevel",
            "dl_virtuaPage": "/funnel/home/step8/funnelRiskLevel"
        },
        "slide-9": {
            "pregunta": "¿Que areas especificas necesitas cubrir?",
            "respuestas": {
                "Solo interior": "slide-10",
                "Solo exterior": "slide-10",
                "Ambos (perimetral e interno)": "slide-10"
            },
            "dl_step": "9",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelCoverageArea",
            "dl_virtuaPage": "/funnel/home/step9/funnelCoverageArea"
        },
        "slide-10": {
            "pregunta": "¿Que elementos consideras imprescindibles?",
            "respuestas": {
                "Camaras de vigilancia": "slide-11",
                "Sistema de alarma": "slide-11",
                "Solucion completa (todo)": "slide-11"
            },
            "dl_step": "10",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelCriticalElements",
            "dl_virtuaPage": "/funnel/home/step10/funnelCriticalElements"
        },
        "slide-11": {
            "pregunta": "¿Cual es tu rango de presupuesto estimado?",
            "respuestas": {
                "Economico": "slide-15",
                "Estandar": "slide-15",
                "Premium": "slide-15"
            },
            "dl_step": "11",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelBudget",
            "dl_virtuaPage": "/funnel/home/step11/funnelBudget"
        },
        "slide-12": {
            "pregunta": "¿Hay mascotas en la vivienda?",//TODO: PREGUNTAR LITERAL POR EL MODELO
            "respuestas": {
                "Sí": "slide-13",
                "No": "slide-13"
            },
            "dl_step": "12",
            "dl_type": "home",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelPets",
            "dl_virtuaPage": "/funnel/home/step12/funnelPets"
        },
        "slide-13": {
            "pregunta": "¿Has sufrido robo u ocupación?",
            "respuestas": {
                "Sí": "slide-14",
                "No": "slide-14"
            },
            "dl_step": "13",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelRobbedHouse",
            "dl_virtuaPage": "/funnel/home/step13/funnelRobbedHouse"
        },
        "slide-14": {
            "pregunta": "¿Actualmente tienes alarma instalada?",
            "respuestas": {
                "No": "slide-15",
                "Sí, de Verisure": "slide-15",
                "Sí, de otra compañía": "slide-15"
            },
            "dl_step": "14",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelHouseAlarmInstalled",
            "dl_virtuaPage": "/funnel/home/step14/funnelHouseAlarmInstalled"
        },
        "slide-15": {
            "pregunta": "Para enviarte el resultado completo, dejanos tu email y telefono:",
            "dl_step": "8",
            "dl_type": "home",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "contactData",
            "dl_virtuaPage": "/funnel/home/step12/contactData"
        },
        "slide-16": {
            "pregunta": "¿Cómo es su negocio?",
            "respuestas": {
                "Negocio a pie de calle": "slide-17",
                "Local en centro comercial": "slide-17",
                "Nave en polígono industrial": "slide-17",
                "Oficina en edificio empresarial": "slide-17"
            },
            "dl_step": "1",
            "dl_type": "business",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelBusinessAccess",
            "dl_virtuaPage": "/funnel/business/step1/funnelBusinessAccess"
        },
        "slide-17": {
            "pregunta": "¿Dónde se encuentra el negocio?",
            "respuestas": {
                "Dentro del núcleo urbano": "slide-18",
                "Fuera del núcleo urbano": "slide-18"
            },
            "dl_step": "2",
            "dl_type": "business",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelBusinessLocation",
            "dl_virtuaPage": "/funnel/business/step2/funnelBusinessLocation"
        },
        "slide-18": {
            "pregunta": "¿Cuántos empleados tiene?",
            "respuestas": {
                "Solo yo": "slide-16",
                "De 2 a 5 empleados": "slide-19",
                "Más de 5 empleados": "slide-19"
            },
            "dl_step": "3",
            "dl_type": "business",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelNumberEmployees",
            "dl_virtuaPage": "/funnel/business/step3/funnelNumberEmployees"
        },
        "slide-19": {
            "pregunta": "¿Qué horario tiene su negocio?",
            "respuestas": {
                "Solo mañanas": "slide-20",
                "Solo tardes": "slide-20",
                "Mañanas y tardes": "slide-20",
                "Nocturno": "slide-20",
                "24 horas": "slide-20"
            },
            "dl_step": "4",
            "dl_type": "business",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelOpeningHours",
            "dl_virtuaPage": "/funnel/business/step4/funnelOpeningHours"
        },
        "slide-20": {
            "pregunta": "¿Cual es tu rango de presupuesto estimado?",
            "respuestas": {
                "Economico": "slide-21",
                "Estandar": "slide-21",
                "Premium": "slide-21"
            },
            "dl_step": "5",
            "dl_type": "business",
            "dl_stepBlock": 'aboutYourInstallation',
            "dl_shortQuestion": "funnelBudget",
            "dl_virtuaPage": "/funnel/business/step5/funnelBudget"
        },
        "slide-21": {
            "pregunta": "¿Cual consideras que es el nivel de riesgo de la zona?",
            "respuestas": {
                "Bajo (zona tranquila)": "slide-22",
                "Medio (urbano)": "slide-22",
                "Alto (aislado o conflictivo)": "slide-22"
            },
            "dl_step": "6",
            "dl_type": "business",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelRiskLevel",
            "dl_virtuaPage": "/funnel/business/step6/funnelRiskLevel"
        },
        "slide-22": {
            "pregunta": "¿Que areas especificas necesitas cubrir?",
            "respuestas": {
                "Solo interior": "slide-23",
                "Solo exterior": "slide-23",
                "Ambos (perimetral e interno)": "slide-23"
            },
            "dl_step": "7",
            "dl_type": "business",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelCoverageArea",
            "dl_virtuaPage": "/funnel/business/step7/funnelCoverageArea"
        },
        "slide-23": {
            "pregunta": "¿Que elementos consideras imprescindibles?",
            "respuestas": {
                "Camaras de vigilancia": "slide-24",
                "Sistema de alarma": "slide-24",
                "Solucion completa (todo)": "slide-24"
            },
            "dl_step": "8",
            "dl_type": "business",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "funnelCriticalElements",
            "dl_virtuaPage": "/funnel/business/step8/funnelCriticalElements"
        },
        "slide-24": {
            "pregunta": "Para enviarte el resultado completo, dejanos tu email y telefono:",
            "dl_step": "9",
            "dl_type": "business",
            "dl_stepBlock": 'security',
            "dl_shortQuestion": "contactData",
            "dl_virtuaPage": "/funnel/business/step9/contactData"
        },
        "slide-25": {
            "file-source": true,
            "final": true,
            "dl_step": "10",
            "dl_type": "business",
            "dl_stepBlock": 'security',
            "dl_virtuaPage": "/funnel/business/step10/leadSent"
        }
    };
}

function getPrevAnswer(value) {
    var re = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
    let parts = value.split(',');
    var cod_vs_neo = {
        'Vivienda': 'home',
        'Negocio': 'business',
        'Piso': 'flat',
        'Chalet': 'chalet',
        'Chalet individual': 'homeIndividual',
        'Adosado': 'homeSemidetached',
        'Pareado': 'homePaired',
        'Piso bajo': 'flatStreetLevel',
        'Piso intermedio': 'flatMiddle',
        'Ático': 'penthouse',
        'Soy propietario': 'owner',
        'Vivo de alquiler': 'rented',
        'Voy una o dos veces al año': '1_2year',
        'Voy en vacaciones': 'holidays',
        'Voy los fines de semana': 'weekends',
        'Negocio a pie de calle': 'businessStreetLevel',
        'Local en centro comercial': 'businessMall',
        'Nave en polígono industrial': 'warehouseIndustrialState',
        'Oficina en edificio empresarial': 'officeBusinessBuilding',
        'Vivienda habitual': 'primary',
        'Segunda vivienda': 'second-home',
        'Dentro del núcleo urbano': 'insideUrban',
        'Fuera del núcleo urbano': 'outsideUrban',
        'Solo yo': 'onlyMe',
        'De 2 a 5 empleados': '2_4employees',
        'Más de 5 empleados': 'more4employees',
        'Portal a pie de calle': 'streetLevel',
        'Urbanización no vigilada': 'unsupervisedUrbanization',
        'Urbanización vigilada': 'guardedUrbanization',
        'Solo mañanas': 'mornings',
        'Solo tardes': 'afternoons',
        'Mañanas y tardes': 'morningsAfternoons',
        'Nocturno': 'nights',
        '24 horas': '24hours',
        'Jardín o parcela': 'garden',
        'Balcón o Terraza': 'balconyOrTerrace',
        'No tiene': 'no',
        'Gran valor': 'hightValue',
        'Medio valor': 'mediumValue',
        'Bajo valor': 'lowValue',
        'Bajo (zona tranquila)': 'riskLow',
        'Medio (urbano)': 'riskMedium',
        'Alto (aislado o conflictivo)': 'riskHigh',
        'Solo interior': 'indoorOnly',
        'Solo exterior': 'outdoorOnly',
        'Ambos (perimetral e interno)': 'bothPerimeterIndoor',
        'Camaras de vigilancia': 'cctv',
        'Sistema de alarma': 'alarmSystem',
        'Solucion completa (todo)': 'fullSolution',
        'Economico': 'budgetLow',
        'Estandar': 'budgetMedium',
        'Premium': 'budgetHigh',
        'Sí': 'yes',
        'Sí, de Verisure': 'yesSecuritasDirect',
        'Sí, de otra compañía': 'yesOtheCompany',
        'No': 'no',
        'Siempre hay alguien': 'always',
        'Menos de 2 horas al día': 'less2hours',
        'Entre 2 y 5 horas al día': '2_4hours',
        'Más de 5 horas al día': 'more4hours',
        'Evitar robo': 'avoidRobbery',
        'Evitar ocupación': 'avoidSquatting',
        //Multichoice
        "Vivo solo o en pareja": "Alone/Couple",
        "Hijos menores de 12 años": "Kids<12",
        "Hijos adolescentes": "Teens",
        "Personas dependientes": "Dependants",
        "Otros familiares": "OtherFamily",
        "Amigos o vecinos": "Friends/Neighbors",
        "Personal doméstico": "DomesticStaff",
        "Nadie": "None"
    };

    if(parts.length > 1){
        return parts.map(function(p) { return cod_vs_neo[p.trim()]; }).filter(Boolean).join(',');
    }
    if (re.test(value)) {
        return value;
    } else {
        return cod_vs_neo[value];
    }
}

function getUrlVars() {
    var url = window.location.href,
        vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        vars[key] = value;
    });
    return vars;
}

function getParentUrlVars() {
    var url = window.parent.location.href,
        vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        vars[key] = value;
    });
    return vars;
}
var msclkid = '';
var gclid = '';
var gclidCookie = '';

$(document).ready(function () {

    let lng = window.navigator.userLanguage || window.navigator.language;
    createTupla('broswer-lang', lng, '-cat1');

    if(typeof funnelTypeTupla !== 'undefined'){
        createTupla('funnelType', funnelTypeTupla)
    }

    if (getCookie('politica-privacidad-agree')) {
        createTupla('politica-privacidad', 'aceptada', '-cat1');
    }

    if (window.location === window.parent.location) {
        var urlVars = getUrlVars();
        $(document).on("policyAccepted", function (event) {
            createTupla('politica-privacidad', 'aceptada', '-cat1');
        });
    } else {
        var urlVars = getParentUrlVars();
        parent.jQuery(parent.document).on("policyAccepted", function (event) {
            createTupla('politica-privacidad', 'aceptada', '-cat1');
        });
    }

    if(typeof getCookie === 'function'){
        gclidCookie = getCookie('_gac_UA-227097-26');
        if(gclidCookie){
            var gclidSplit = gclidCookie.split('.')
            gclid = gclidSplit.length > 1 ? gclidSplit[gclidSplit.length - 1] : ''
        }else if(urlVars.gclid != null){
            gclid = urlVars.gclid
        }
        if(gclid){
            createTupla('gclid', gclid.substring(0,120), '-cat1')
        }
    }

    if(urlVars.msclkid != null){
        msclkid = urlVars.msclkid
        createTupla('msclkid', msclkid.substring(0,120), '-cat1')
    }

    var keyword = ''
    if(urlVars.keyword != null){
        keyword = urlVars.keyword
        createTupla('keyword', keyword.substring(0,64), '-cat1')
    }

    var campaignid = ''
    if(urlVars.campaignid != null){
        campaignid = urlVars.campaignid
        createTupla('campaignid', campaignid.substring(0,64), '-cat1')
    }
});