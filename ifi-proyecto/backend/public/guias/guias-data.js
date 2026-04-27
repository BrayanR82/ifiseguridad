window.GUIAS_DATA = [
  {
    id: 'camarasIp',
    slug: 'configuracion-camaras-ip',
    title: 'Configuración de cámaras IP',
    summary: 'Deja una cámara IP operativa con acceso local y remoto seguro.',
    intro: 'Guía para dejar una cámara IP operativa con acceso local y remoto seguro.',
    steps: [
      'Conecta la cámara al switch PoE o a su fuente y verifica el enlace físico.',
      'Detecta el dispositivo con la herramienta del fabricante o un escaneo de red.',
      'Asigna IP fija en el rango de la instalación y configura puerta de enlace y DNS.',
      'Cambia las credenciales por defecto y activa autenticación fuerte.',
      'Ajusta resolución, FPS, compresión y perfiles de grabación según el escenario.',
      'Valida el stream principal y secundario desde VMS o NVR y documenta los parámetros finales.'
    ]
  },
  {
    id: 'grabadores',
    slug: 'configuracion-nvr-dvr',
    title: 'Configuración de grabadores NVR y DVR',
    summary: 'Alta de canales, almacenamiento y acceso de administración.',
    intro: 'Checklist práctico para alta de canales, almacenamiento y acceso de administración.',
    steps: [
      'Actualiza el firmware del grabador y reinicia en una ventana de mantenimiento.',
      'Define fecha, zona horaria y NTP para preservar la trazabilidad de eventos.',
      'Configura discos, política de sobreescritura y alertas de capacidad.',
      'Agrega cámaras por protocolo compatible y verifica el estado de cada canal.',
      'Crea usuarios por rol y restringe permisos de borrado o exportación.',
      'Prueba reproducción, exportación de evidencia y notificaciones críticas.'
    ]
  },
  {
    id: 'lectoras',
    slug: 'control-de-acceso-lectoras',
    title: 'Configuración de lectoras de control de acceso',
    summary: 'Integra lectoras, controladoras y políticas de acceso seguras.',
    intro: 'Procedimiento para integrar lectoras, controladoras y políticas de acceso seguras.',
    steps: [
      'Revisa cableado Wiegand/OSDP, alimentación y tierra antes de energizar.',
      'Registra la lectora en la controladora y asigna puerta o zona correspondiente.',
      'Configura horarios, niveles de acceso y reglas anti-passback si aplica.',
      'Da de alta tarjetas o credenciales y asocia usuarios con su perfil.',
      'Valida aperturas, rechazos, eventos de puerta forzada y bloqueo remoto.',
      'Respalda la configuración y deja evidencia de pruebas de aceptación.'
    ]
  },
  {
    id: 'direccionesIp',
    slug: 'asignacion-direcciones-ip',
    title: 'Asignación de direcciones IP a dispositivos',
    summary: 'Ordena el direccionamiento y evita conflictos en campo.',
    intro: 'Estándar para ordenar el direccionamiento y evitar conflictos en campo.',
    steps: [
      'Reserva un segmento por tipo de dispositivo (cámaras, NVR, control de acceso).',
      'Define una convención de nombres y una tabla de inventario con MAC e IP.',
      'Configura IP estática o reservas DHCP según la política del cliente.',
      'Comprueba conectividad con ping, traceroute y acceso por puertos de gestión.',
      'Aplica VLAN y ACL cuando se requiera separar tráfico de videovigilancia.',
      'Actualiza la documentación de red con cambios y responsables.'
    ]
  },
  {
    id: 'montajePc',
    slug: 'montaje-reparacion-pcs',
    title: 'Montaje y reparación de PCs',
    summary: 'Flujo técnico para ensamblar equipos y resolver fallos frecuentes.',
    intro: 'Flujo técnico para ensamblar equipos y resolver fallos frecuentes de hardware.',
    steps: [
      'Valida compatibilidad de placa base, CPU, RAM, fuente y almacenamiento.',
      'Monta componentes con medidas ESD y aplica pasta térmica correctamente.',
      'Realiza POST inicial, revisa BIOS/UEFI y ajusta el orden de arranque.',
      'Instala sistema operativo, drivers y utilidades de monitorización.',
      'Ejecuta pruebas de estrés en CPU, RAM y disco para detectar inestabilidad.',
      'Entrega informe técnico con piezas reemplazadas y recomendaciones de uso.'
    ]
  },
  {
    id: 'mantenimiento',
    slug: 'mantenimiento-videovigilancia',
    title: 'Mantenimiento de sistemas de videovigilancia',
    summary: 'Rutina preventiva para mantener calidad de imagen y seguridad.',
    intro: 'Rutina preventiva para mantener calidad de imagen, disponibilidad y seguridad.',
    steps: [
      'Limpia ópticas y carcasas, revisando humedad, polvo y sellado.',
      'Verifica enfoque, ángulos y zonas ciegas frente a cambios del entorno.',
      'Comprueba salud de discos, logs del NVR y estado de grabaciones.',
      'Actualiza firmware bajo un plan controlado y confirma compatibilidad.',
      'Evalúa consumo, UPS y protecciones para evitar caídas por energía.',
      'Cierra la visita con acta de hallazgos, acciones y fecha del siguiente ciclo.'
    ]
  },
  {
    id: 'backups',
    slug: 'copias-seguridad',
    title: 'Copias de seguridad (backups)',
    summary: 'Protege configuraciones, evidencias y datos críticos.',
    intro: 'Práctica recomendada para proteger configuraciones, evidencias y datos críticos.',
    steps: [
      'Clasifica qué respaldar: configuraciones, base de datos, clips y reportes.',
      'Define estrategia 3-2-1 con cifrado y retención por criticidad.',
      'Automatiza tareas con cron o scheduler y monitoriza ejecuciones.',
      'Valida integridad con checksums y pruebas de restauración parciales.',
      'Replica en almacenamiento externo o nube según la política de seguridad.',
      'Documenta el procedimiento de recuperación con tiempos objetivo (RTO/RPO).'
    ]
  },
  {
    id: 'dockerDeploy',
    slug: 'despliegue-docker',
    title: 'Despliegue de la web mediante Docker',
    summary: 'Despliega la aplicación en contenedores de forma repetible.',
    intro: 'Guía base para desplegar la aplicación en contenedores de forma repetible.',
    steps: [
      'Construye la imagen con un Dockerfile versionado y variables externas.',
      'Levanta servicios con Docker Compose y una red privada dedicada.',
      'Configura volúmenes para persistencia de datos y logs.',
      'Publica puertos estrictamente necesarios y aplica políticas restart.',
      'Ejecuta healthchecks y verifica endpoints de aplicación y CMS.',
      'Automatiza despliegues con tags, rollback y checklist post-release.'
    ]
  },
  {
    id: 'gitlabUbuntu',
    slug: 'gitlab-ubuntu-server',
    title: 'Gestión del repositorio con GitLab desde Ubuntu Server',
    summary: 'Trabaja con ramas, despliegues y control de cambios en servidor.',
    intro: 'Flujo operativo para trabajar con ramas, despliegues y control de cambios en servidor.',
    steps: [
      'Instala Git y claves SSH en Ubuntu Server para acceso seguro al remoto.',
      'Clona el repositorio, configura el usuario local y la estrategia de ramas.',
      'Sincroniza cambios con pull --rebase y resuelve conflictos de forma limpia.',
      'Versiona con commits atómicos y mensajes descriptivos orientados a trazabilidad.',
      'Empuja ramas a GitLab y usa merge requests con revisión técnica.',
      'Integra pipeline CI para pruebas y despliegue controlado en producción.'
    ]
  }
];

const GUIAS_DETAILS = {
  camarasIp: {
    intro: 'Guía técnica para implementar una cámara IP con calidad de imagen estable, red segura y acceso remoto controlado.',
    context: 'Este flujo está orientado a instalaciones residenciales y comerciales pequeñas donde importa la claridad en evidencia, la continuidad de grabación y una puesta en marcha rápida sin perder seguridad.',
    requirements: [
      'Cámara IP con firmware actualizado, switch PoE o fuente certificada y cableado validado.',
      'Acceso a red local con direccionamiento definido y permisos de administración.',
      'Credenciales seguras y criterio de calidad (resolución, fps y retención) acordado con el cliente.'
    ],
    bestPractices: [
      'Prioriza perfiles diferenciados para visualización en vivo y grabación para optimizar ancho de banda.',
      'Configura zonas de privacidad y máscaras cuando exista exposición a espacios sensibles.',
      'Documenta en acta final IP, puerto, usuario técnico, versión de firmware y posición física.'
    ],
    image: 'images/configuracion-camaras-ip.svg',
    imageAlt: 'Ilustración de configuración de cámara IP con red y monitoreo'
  },
  grabadores: {
    intro: 'Proceso completo para dejar un NVR/DVR operativo, con grabación confiable, usuarios por rol y exportación de evidencia.',
    context: 'La meta es asegurar que el grabador no solo funcione, sino que también cumpla criterios de trazabilidad y disponibilidad para revisión de incidentes en campo.',
    requirements: [
      'Grabador con discos compatibles, cámaras previamente dadas de alta y red estable.',
      'Sincronización horaria (NTP) disponible y política de almacenamiento definida.',
      'Matriz de usuarios y permisos aprobada por responsable del sitio.'
    ],
    bestPractices: [
      'Reserva canales de contingencia para crecimiento futuro y reemplazos rápidos.',
      'Activa alertas por caída de canal, pérdida de disco y eventos críticos del sistema.',
      'Valida exportación de clips en formato reproducible fuera del ecosistema del fabricante.'
    ],
    image: 'images/configuracion-nvr-dvr.svg',
    imageAlt: 'Ilustración de grabador NVR DVR con múltiples canales de video'
  },
  lectoras: {
    intro: 'Guía para integrar lectoras y controladoras con criterios de seguridad física, continuidad operativa y control granular por perfiles.',
    context: 'Aplica tanto para accesos peatonales como para áreas restringidas donde se requiere bitácora detallada de entradas, salidas y eventos de excepción.',
    requirements: [
      'Controladora compatible, lectoras correctamente cableadas y fuente estabilizada.',
      'Definición previa de niveles de acceso, horarios y excepciones operativas.',
      'Catálogo de usuarios o credenciales iniciales para pruebas de aceptación.'
    ],
    bestPractices: [
      'Evita compartir credenciales entre áreas para mantener auditoría real por usuario.',
      'Implementa prueba de contingencia ante corte de energía y verifica modo fail-safe/fail-secure.',
      'Respalda base de datos de credenciales antes de cambios masivos de configuración.'
    ],
    image: 'images/control-de-acceso-lectoras.svg',
    imageAlt: 'Ilustración de lectoras y control de acceso en puerta segura'
  },
  direccionesIp: {
    intro: 'Estándar de asignación IP para reducir conflictos, mejorar mantenimiento y facilitar la escalabilidad de sistemas de seguridad.',
    context: 'Un direccionamiento bien planificado acelera soporte, reduce tiempos de diagnóstico y permite integrar nuevos dispositivos sin interrupciones.',
    requirements: [
      'Plan de red con subredes definidas, VLAN aprobadas y políticas de acceso claras.',
      'Inventario inicial con serial, MAC y ubicación física de cada equipo.',
      'Herramientas básicas de validación de conectividad y tabla de documentación.'
    ],
    bestPractices: [
      'Usa nomenclatura consistente para hostnames y etiquetas físicas en gabinete.',
      'Separa gestión y video en segmentos distintos cuando el tráfico sea elevado.',
      'Mantén historial de cambios para trazabilidad de incidentes de red.'
    ],
    image: 'images/asignacion-direcciones-ip.svg',
    imageAlt: 'Ilustración de esquema de red y asignación de direcciones IP'
  },
  montajePc: {
    intro: 'Guía de ensamblaje y reparación orientada a estabilidad, rendimiento térmico y diagnóstico ordenado de fallas comunes.',
    context: 'Pensada para estaciones de trabajo y equipos administrativos que necesitan operación continua con mantenimientos preventivos y correctivos bien documentados.',
    requirements: [
      'Componentes validados por compatibilidad y fuente con margen de potencia seguro.',
      'Herramientas ESD, pasta térmica y kit de limpieza para montaje técnico.',
      'Medio de instalación de sistema operativo y controladores actualizados.'
    ],
    bestPractices: [
      'Asegura flujo de aire frontal a posterior y gestión de cables para mejor temperatura.',
      'Ejecuta pruebas de memoria y almacenamiento antes de entrega final.',
      'Registra seriales de piezas críticas para facilitar garantías y futuros cambios.'
    ],
    image: 'images/montaje-reparacion-pcs.svg',
    imageAlt: 'Ilustración de montaje y reparación de computadora de escritorio'
  },
  mantenimiento: {
    intro: 'Rutina periódica para conservar calidad de evidencia, disponibilidad de plataforma y vida útil de la infraestructura de videovigilancia.',
    context: 'Ideal para contratos de mantenimiento donde se busca reducir fallas sorpresivas y mantener cumplimiento operativo en instalaciones activas.',
    requirements: [
      'Calendario de mantenimiento preventivo con ventanas de intervención autorizadas.',
      'Checklist técnico por sitio y acceso seguro a NVR, cámaras y tableros eléctricos.',
      'Formato de acta para hallazgos, evidencias y acciones correctivas.'
    ],
    bestPractices: [
      'Incluye revisión nocturna para verificar exposición y comportamiento IR real.',
      'Evalúa estado de UPS y autonomía ante cortes para continuidad de grabación.',
      'Mantén versiones de firmware homogéneas por familia de dispositivos.'
    ],
    image: 'images/mantenimiento-videovigilancia.svg',
    imageAlt: 'Ilustración de mantenimiento preventivo de sistema de videovigilancia'
  },
  backups: {
    intro: 'Estrategia práctica de respaldo para proteger configuraciones, evidencia audiovisual y datos críticos ante fallas o incidentes.',
    context: 'En operaciones de seguridad, la restauración rápida es tan importante como la copia. Esta guía prioriza verificaciones periódicas y recuperación efectiva.',
    requirements: [
      'Identificación de activos críticos y clasificación por nivel de impacto.',
      'Destino de backup local y externo con cifrado habilitado.',
      'Definición de objetivos de recuperación (RTO) y pérdida máxima aceptable (RPO).'
    ],
    bestPractices: [
      'Prueba restauración mensual en entorno controlado, no solo ejecución de respaldo.',
      'Versiona respaldos para prevenir sobreescritura de configuraciones funcionales.',
      'Monitorea alertas de tareas fallidas y documenta acciones de remediación.'
    ],
    image: 'images/copias-seguridad.svg',
    imageAlt: 'Ilustración de copias de seguridad y restauración de información'
  },
  dockerDeploy: {
    intro: 'Flujo de despliegue con Docker para publicar la web de forma repetible, controlada y fácil de mantener en distintos entornos.',
    context: 'El objetivo es minimizar variaciones entre desarrollo y producción, con despliegues predecibles y capacidad de rollback ante incidencias.',
    requirements: [
      'Docker y Docker Compose instalados en el entorno objetivo.',
      'Variables de entorno separadas por ambiente y repositorio versionado.',
      'Puertos, volúmenes y política de reinicio definidos previamente.'
    ],
    bestPractices: [
      'Utiliza imágenes versionadas por tag semántico para trazabilidad.',
      'Activa healthchecks y monitorea reinicios para detectar degradación temprana.',
      'Incluye checklist post-despliegue con verificación funcional y de seguridad.'
    ],
    image: 'images/despliegue-docker.svg',
    imageAlt: 'Ilustración de despliegue web con contenedores Docker'
  },
  gitlabUbuntu: {
    intro: 'Guía operativa para administrar repositorios GitLab desde Ubuntu Server con buenas prácticas de ramas, revisión y automatización CI.',
    context: 'En equipos técnicos, este flujo asegura consistencia de cambios, menor fricción al colaborar y mayor control antes de pasar a producción.',
    requirements: [
      'Servidor Ubuntu con acceso SSH y Git instalado correctamente.',
      'Permisos en proyecto GitLab y estrategia de ramas documentada.',
      'Pipeline base para pruebas y validaciones automáticas en merge requests.'
    ],
    bestPractices: [
      'Mantén commits pequeños y atómicos para facilitar revisión y rollback.',
      'Protege ramas principales y exige aprobación para fusionar cambios.',
      'Automatiza pruebas mínimas en CI para detectar errores antes del despliegue.'
    ],
    image: 'images/gitlab-ubuntu-server.svg',
    imageAlt: 'Ilustración de gestión de repositorio GitLab desde Ubuntu Server'
  }
};

window.GUIAS_DATA = window.GUIAS_DATA.map((guide) => ({
  ...guide,
  ...(GUIAS_DETAILS[guide.id] || {})
}));
