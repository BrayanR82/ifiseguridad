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
