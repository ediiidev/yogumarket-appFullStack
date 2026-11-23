# YoguMarket — Documento de requisitos

**Documento:** Especificación de requisitos de software (ERS)
**Versión:** 0.5
**Estado:** Ingeniería de requisitos cerrada para iniciar el diseño técnico
**Producto:** YoguMarket
**Tipo de aplicación:** Sistema web responsive
**Ubicación del negocio:** Caracas, Venezuela
**Idioma principal:** Español
**Zona horaria:** `America/Caracas` (UTC−4)
**Moneda principal:** USD
**Moneda secundaria informativa:** VES

---

## Control de versiones

| Versión | Descripción                                                                 |
| ------- | --------------------------------------------------------------------------- |
| 0.1     | Estructura inicial del documento                                            |
| 0.2     | Ampliación de requisitos funcionales y operativos                           |
| 0.3     | Incorporación de seguridad, inventario y logística                          |
| 0.4     | Revisión de requisitos y decisiones de negocio                              |
| 0.5     | Consolidación de los acuerdos aprobados durante la ingeniería de requisitos |

**Regla de mantenimiento:** cada modificación de requisitos deberá quedar documentada, identificando la decisión, su motivo, el impacto sobre el sistema y la versión correspondiente.

## 1. Introducción

### 1.1 Propósito

YoguMarket es una aplicación web para gestionar las operaciones de un negocio dedicado a la reventa de yogures terminados, permitiendo administrar productos, inventario, clientes, pedidos, pagos, entregas, devoluciones y atención al cliente.

El sistema busca centralizar las operaciones comerciales y administrativas, proporcionar trazabilidad y facilitar el seguimiento de pedidos.

Este documento define los requisitos funcionales, no funcionales, reglas de negocio, restricciones y alcance del MVP.

### 1.2 Objetivos

- Facilitar la compra de productos al mayor y detal.
- Permitir la gestión centralizada de pedidos y pagos.
- Controlar inventario mediante lotes y fechas de vencimiento.
- Evitar sobreventas y reservas inconsistentes.
- Organizar la asignación y ejecución de entregas.
- Facilitar la administración de clientes y colaboradores.
- Mantener trazabilidad de las operaciones.
- Proporcionar información clara sobre precios en USD y su equivalente informativo en VES.
- Establecer una base técnica ampliable a futuras funcionalidades.

### 1.3 Alcance geográfico y operativo

El MVP atenderá:

- Un único negocio.
- Una única ciudad: Caracas, Venezuela.
- Zonas de cobertura configuradas desde la ubicación del negocio.
- Una arquitectura preparada para ampliar posteriormente la cobertura geográfica.

La distancia para determinar cobertura se calculará mediante la fórmula de Haversine, utilizando distancia en línea recta y no distancia por carretera.

### 1.4 Usuarios destinatarios

Este documento está dirigido a:

- Desarrolladores.
- Responsables del producto.
- Administradores del negocio.
- Personal encargado de operaciones.
- Responsables de pruebas y mantenimiento.

## 2. Descripción general del producto

### 2.1 Tipo de sistema

Aplicación web responsive con frontend independiente y backend mediante API REST.

### 2.2 Arquitectura tecnológica prevista

| Componente                        | Tecnología                               |
| --------------------------------- | ---------------------------------------- |
| Frontend                          | React + Vite + TypeScript                |
| Backend                           | Node.js + Express 5 + TypeScript         |
| Base de datos                     | PostgreSQL                               |
| Hosting de base de datos          | Neon, sujeto a límites del plan gratuito |
| Acceso inicial a PostgreSQL       | `pg` (node-postgres)                     |
| ORM previsto para etapa posterior | Prisma                                   |
| Estilos                           | Tailwind CSS                             |
| Componentes de interfaz           | shadcn/ui                                |
| Navegación                        | React Router                             |
| Formularios                       | React Hook Form                          |
| Validaciones                      | Zod                                      |
| Comunicación                      | API REST HTTP/JSON                       |
| Control de versiones              | Git y GitHub                             |
| Pruebas unitarias                 | Vitest                                   |
| Pruebas de integración HTTP       | Supertest                                |
| Pruebas E2E                       | Playwright                               |

La selección definitiva de servicios externos dependerá de sus límites, condiciones y disponibilidad en planes gratuitos.

### 2.3 Restricciones tecnológicas

- No utilizar aplicaciones móviles nativas en el MVP.
- No desarrollar una PWA en el MVP.
- No conectar el frontend directamente a PostgreSQL.
- No almacenar contraseñas, tokens o secretos en texto plano.
- No almacenar archivos binarios directamente en PostgreSQL.
- No depender de servicios de pago para funcionalidades esenciales del MVP, salvo que sean imprescindibles y se aprueben previamente.

## 3. Actores y roles

### 3.1 Cliente (`CLIENT`)

Puede:

- Registrarse y verificar su correo electrónico.
- Iniciar y cerrar sesión.
- Consultar el catálogo.
- Administrar direcciones.
- Mantener un carrito.
- Crear pedidos.
- Informar pagos.
- Consultar estados e historial.
- Crear tickets.
- Solicitar cancelaciones, correcciones y devoluciones cuando corresponda.
- Consultar anuncios publicados.
- Administrar sus datos personales y sesiones.

### 3.2 Administrador (`ADMIN`)

Puede:

- Administrar usuarios y asignar roles.
- Gestionar productos, presentaciones y sabores.
- Administrar precios y descuentos.
- Gestionar inventario y lotes.
- Registrar ajustes, bajas y mermas.
- Autorizar reincorporaciones de devoluciones.
- Administrar tasas USD/VES.
- Configurar el calendario operativo.
- Administrar zonas y tarifas de entrega.
- Gestionar anuncios.
- Supervisar pagos, pedidos, tickets y repartidores.
- Consultar auditoría.
- Configurar los datos generales del negocio.

### 3.3 Operador (`OPERATOR`)

Puede:

- Consultar y gestionar pedidos.
- Verificar pagos.
- Gestionar preparación.
- Consultar asignaciones FEFO.
- Registrar nuevos lotes.
- Consultar existencias.
- Gestionar asignaciones de repartidores.
- Atender incidencias.
- Inspeccionar productos devueltos.
- Gestionar tickets.
- Consultar tasas vigentes, sin modificarlas.

No puede realizar ajustes manuales de inventario ni administrar tasas de conversión.

### 3.4 Repartidor (`DELIVERER`)

Puede:

- Consultar únicamente entregas asignadas.
- Consultar los datos necesarios de los clientes.
- Iniciar rutas.
- Registrar intentos de entrega.
- Registrar entregas.
- Registrar devoluciones físicas.
- Informar su posición GPS.
- Registrar observaciones y evidencias.

No puede consultar todos los pedidos ni modificar inventario.

### 3.5 Servicio de correo

Actor externo encargado de entregar notificaciones por correo electrónico.

## 4. Requisitos funcionales

### 4.1 Registro y autenticación

**RF-001.** El sistema permitirá el registro público de clientes.

**RF-002.** El registro público asignará exclusivamente el rol `CLIENT`.

**RF-003.** El usuario deberá verificar su correo antes de iniciar sesión y comprar.

**RF-004.** El administrador será el único rol autorizado para asignar roles privilegiados.

**RF-005.** La verificación utilizará tokens aleatorios temporales, almacenados mediante hash y con uso único.

**RF-006.** El sistema permitirá recuperar contraseñas mediante enlaces temporales de uso único.

**RF-007.** Las respuestas de recuperación serán genéricas, sin revelar si una cuenta existe.

**RF-008.** El cambio de contraseña invalidará las sesiones existentes.

**RF-009.** El sistema permitirá autenticación TOTP obligatoria para administradores, operadores y repartidores.

**RF-010.** La autenticación TOTP será compatible con aplicaciones como Google Authenticator y Microsoft Authenticator.

**RF-011.** El cliente no tendrá 2FA obligatorio en el MVP.

**RF-012.** El sistema permitirá recuperación segura de 2FA mediante códigos de recuperación de un solo uso.

**RF-013.** Se aplicará bloqueo temporal después de cinco intentos fallidos consecutivos, durante quince minutos, con controles adicionales de rate limiting.

**RF-014.** Las contraseñas tendrán longitud mínima de 12 y máxima de 128 caracteres. Se permitirán espacios y símbolos; se rechazarán contraseñas comunes o comprometidas.

**RF-015.** No se exigirá cambio periódico de contraseña.

**RF-016.** Las sesiones de clientes tendrán 30 minutos de inactividad y duración máxima de siete días.

**RF-017.** Las sesiones de colaboradores tendrán 15 minutos de inactividad y duración máxima de ocho horas.

**RF-018.** El usuario podrá cerrar sesión manualmente.

**RF-019.** El sistema revocará sesiones al cambiar contraseña o desactivar una cuenta.

**RF-020.** Se permitirán varias sesiones simultáneas del mismo cliente, independientes por dispositivo.

**RF-021.** El cliente podrá consultar sus sesiones y cerrar una sesión individual o todas las demás.

**RF-022.** El cliente podrá modificar nombre, apellidos, correo y teléfono, siguiendo verificaciones de seguridad.

**RF-023.** Los cambios de correo requerirán contraseña actual y verificación del nuevo correo, con aviso al correo anterior.

**RF-024.** Los cambios de teléfono requerirán contraseña actual y OTP enviado al nuevo número.

**RF-025.** El cliente podrá cambiar su contraseña desde el perfil, invalidando las sesiones existentes y recibiendo una notificación.

**RF-026.** El cliente podrá solicitar eliminación de su cuenta. La eliminación o anonimización respetará las obligaciones legales de conservación aplicables.

### 4.2 Catálogo y productos

**RF-027.** El administrador podrá crear, editar y desactivar productos.

**RF-028.** Cada producto podrá incluir nombre, descripción e imágenes.

**RF-029.** El catálogo diferenciará presentación y sabor.

**RF-030.** Cada combinación de producto, presentación y sabor tendrá inventario independiente.

**RF-031.** Cada producto podrá tener precio detal, precio mayor y cantidad mínima para precio mayor.

**RF-032.** Se permitirán descuentos por volumen configurables por producto y presentación.

**RF-033.** Los rangos de descuentos no podrán solaparse ni contradecirse.

**RF-034.** Las cantidades de distintos sabores podrán combinarse para alcanzar el mínimo de mayor cuando pertenezcan a la misma presentación y condiciones comerciales.

**RF-035.** No se combinarán presentaciones diferentes para alcanzar el mínimo de mayor.

**RF-036.** El backend calculará precios y descuentos. No confiará en importes enviados por el frontend.

**RF-037.** El catálogo permitirá buscar por nombre.

**RF-038.** Permitirá filtrar por sabor, presentación y disponibilidad.

**RF-039.** Permitirá ordenar por precio, nombre y novedades.

**RF-040.** Utilizará paginación del lado del backend.

**RF-041.** Los productos agotados permanecerán visibles con indicación de agotado, pero no podrán comprarse.

**RF-042.** El estado administrativo del producto será independiente de la disponibilidad de inventario.

Estados de producto:

- `ACTIVE`: visible y potencialmente comprable si existe stock apto.
- `INACTIVE`: no comprable aunque exista stock.
- Agotado: producto activo sin stock apto disponible.

**RF-043.** Desactivar un producto no eliminará su historial ni sus movimientos de inventario.

**RF-044.** Los pedidos y reservas existentes mantendrán su historial al desactivar un producto.

**RF-045.** El sistema conservará historial de cambios de precios, incluyendo valor anterior, valor nuevo, tipo de precio, responsable, fecha y motivo obligatorio.

### 4.3 Carrito

**RF-046.** Cada cliente autenticado tendrá un único carrito activo.

**RF-047.** El carrito persistirá en PostgreSQL y estará asociado al cliente.

**RF-048.** El cliente podrá acceder a su carrito desde distintos dispositivos.

**RF-049.** El carrito no reservará inventario.

**RF-050.** El backend revalidará stock, precios, descuentos y envío al crear el pedido.

**RF-051.** Si un producto deja de estar disponible o cambia su precio, el cliente deberá revisar el carrito antes de confirmar.

**RF-052.** Al crear un pedido, el carrito se vaciará.

**RF-053.** El pedido conservará una copia independiente de productos, cantidades, precios y descuentos.

**RF-054.** Si el pedido se cancela, expira o se rechaza el pago, el carrito no se restaurará automáticamente.

**RF-055.** El cliente podrá volver a agregar productos, sujetos a nuevas validaciones.

**RF-056.** No habrá favoritos en el MVP.

### 4.4 Pedidos

**RF-057.** Comprar requerirá registro, verificación de correo e inicio de sesión.

**RF-058.** Cada cliente podrá tener solamente un pedido activo a la vez.

**RF-059.** No podrá crear otro pedido hasta que el actual se resuelva, cancele o expire.

**RF-060.** La restricción se aplicará en backend y PostgreSQL para evitar pedidos simultáneos desde distintos dispositivos.

**RF-061.** El cliente podrá crear pedidos al mayor y detal.

**RF-062.** El sistema validará stock disponible antes de crear el pedido.

**RF-063.** El sistema reservará inventario durante treinta minutos para que el cliente informe el pago.

**RF-064.** Si el cliente no informa el pago dentro del plazo, el pedido expirará y se liberará la reserva, siempre que las unidades sigan aptas y vigentes.

**RF-065.** Al informar el pago dentro del plazo, la reserva permanecerá mientras el operador verifica.

**RF-066.** El operador tendrá treinta minutos desde el aviso de pago para aprobar o rechazar.

**RF-067.** Si el operador incumple ese plazo, se generará una alerta y la reserva se mantendrá hasta su resolución.

**RF-068.** Si el pago se aprueba, la reserva pasará a venta confirmada y se descontará el stock.

**RF-069.** Si el pago se rechaza, se liberará la reserva conforme a la vigencia y aptitud de los lotes.

**RF-070.** Si el cliente realizó el pago a tiempo, pero lo informó tarde, el caso pasará a revisión manual.

**RF-071.** La recuperación de un pedido informado tarde requerirá validar el pago y comprobar stock suficiente para generar una nueva reserva.

**RF-072.** Si no puede recuperarse el pedido pagado, se gestionará un ticket de devolución.

**RF-073.** El sistema evitará sobreventas mediante transacciones y bloqueos adecuados en PostgreSQL.

**RF-074.** La creación de pedidos será idempotente mediante clave única por operación. Los reintentos devolverán el pedido original sin duplicar reservas ni movimientos.

**RF-075.** Una compra nueva e independiente requerirá una clave de idempotencia nueva.

**RF-076.** El pedido conservará snapshots históricos de productos, cantidades, precios, descuentos, dirección, zona, envío y tasa USD/VES.

**RF-077.** El pedido no podrá modificarse directamente después de crearse.

**RF-078.** Antes de informar pago, el cliente podrá cancelar y crear otro pedido.

**RF-079.** Después de informar pago, el cliente solicitará cancelación al operador.

**RF-080.** Después de aprobar el pago, cualquier cancelación dependerá de la etapa de preparación o entrega y de la decisión operativa.

**RF-081.** Un pedido entregado no podrá cancelarse; cualquier reclamación seguirá un proceso independiente.

**RF-082.** La cancelación de un pedido pagado no implicará que el dinero haya sido reembolsado.

**RF-083.** El sistema registrará solicitante, fecha, motivo, decisión y responsable de cancelación.

**RF-084.** Los cambios administrativos excepcionales quedarán auditados.

### 4.5 Pagos manuales

**RF-085.** El MVP no incorporará pasarela de pagos.

**RF-086.** El cliente consultará las instrucciones bancarias desde la plataforma.

**RF-087.** Para informar el pago, los últimos cuatro dígitos de la referencia de transacción serán obligatorios.

**RF-088.** El comprobante de imagen o PDF será opcional.

**RF-089.** El operador verificará importe, referencia, fecha/hora, cuenta receptora y comprobante cuando exista.

**RF-090.** Los últimos cuatro dígitos no constituirán por sí solos prueba suficiente de pago.

**RF-091.** El sistema registrará fecha/hora del aviso del cliente y, cuando esté disponible, fecha/hora de la transacción.

**RF-092.** Los estados de pedido y pago se gestionarán por separado.

### 4.6 Moneda y conversión USD/VES

**RF-093.** La moneda principal del negocio será USD.

**RF-094.** Los precios y operaciones comerciales se almacenarán en USD.

**RF-095.** El sistema mostrará debajo de los importes en USD su equivalente informativo en VES.

**RF-096.** El administrador actualizará manualmente la tasa de referencia USD/VES, sin integración con API externa en el MVP.

**RF-097.** La tasa podrá actualizarse varias veces durante el mismo día.

**RF-098.** Cada tasa registrada conservará valor, fecha/hora, administrador responsable y observación opcional.

**RF-099.** La última tasa registrada será la vigente para catálogo y nuevos pedidos.

**RF-100.** Si la tasa tiene más de 24 horas, el catálogo mostrará una advertencia de tasa pendiente de actualización y la fecha de referencia utilizada.

**RF-101.** Los precios en USD seguirán funcionando normalmente aunque la tasa esté desactualizada.

**RF-102.** Al confirmar el pedido, el backend utilizará la última tasa vigente.

**RF-103.** Si la tasa cambia durante la revisión del checkout, el sistema detectará el cambio, recalculará equivalentes y exigirá que el cliente revise y acepte la información actualizada antes de confirmar.

**RF-104.** Al crearse el pedido, la tasa y su equivalente informativo quedarán congelados para ese pedido.

**RF-105.** Los cambios posteriores no modificarán pedidos existentes.

**RF-106.** El checkout mostrará subtotal, costo de envío y total en USD y sus equivalentes informativos en VES, junto con la tasa y fecha de actualización.

**RF-107.** El total oficial del pedido permanecerá expresado en USD.

**RF-108.** La conversión será informativa; no habrá pagos multimoneda en el MVP.

**RF-109.** La tasa conservará hasta seis decimales. Los importes se mostrarán con dos decimales.

**RF-110.** Los cálculos utilizarán aritmética decimal consistente desde el backend.

**RF-111.** PostgreSQL utilizará `NUMERIC` para tasas e importes monetarios. No se utilizarán `FLOAT` ni `REAL`.

**RF-112.** El administrador podrá consultar y filtrar el historial de tasas.

**RF-113.** Las tasas históricas serán inmutables. No podrán editarse ni eliminarse.

**RF-114.** Para corregir una tasa incorrecta, el administrador registrará una nueva tasa con una observación que explique la corrección.

**RF-115.** Solamente `ADMIN` podrá registrar o corregir tasas. `OPERATOR` podrá consultar la tasa vigente, sin modificarla.

### 4.7 Direcciones y cobertura

**RF-116.** El cliente podrá guardar varias direcciones.

**RF-117.** Cada dirección podrá identificarse como casa, trabajo u otra descripción.

**RF-118.** Se solicitarán país, ciudad, sector, calle, número, edificio/piso opcional, referencias y coordenadas.

**RF-119.** El cliente introducirá dirección escrita y podrá ajustar un marcador en un mapa.

**RF-120.** El pedido conservará una copia histórica de la dirección y coordenadas utilizadas.

**RF-121.** El backend calculará distancia, cobertura, zona y tarifa.

**RF-122.** La distancia se calculará en línea recta mediante Haversine.

**RF-123.** Se bloqueará el checkout cuando la dirección esté fuera del radio máximo configurado.

**RF-124.** El proveedor de mapas y geocodificación se seleccionará según disponibilidad y límites gratuitos.

### 4.8 Envíos y entregas

**RF-125.** El costo de envío combinará tarifas configurables por zona/radio y envío gratuito a partir de un importe mínimo configurable.

**RF-126.** El backend calculará y guardará zona, distancia y tarifa del pedido.

**RF-127.** El pedido conservará un snapshot de las condiciones de envío aplicadas.

**RF-128.** El sistema permitirá agrupar una o dos entregas en una ruta.

**RF-129.** Un repartidor podrá tener máximo dos pedidos activos.

**RF-130.** Se priorizará agrupar pedidos de una misma dirección y luego de zonas cercanas.

**RF-131.** La asignación considerará repartidores habilitados, disponibles y con menor carga pendiente, equilibrando entregas del día.

**RF-132.** Se evitarán asignaciones duplicadas o incompatibles.

**RF-133.** El regreso al negocio será obligatorio antes de que el repartidor vuelva a estar disponible para una nueva ruta.

**RF-134.** Se utilizará geocerca de 200 metros alrededor del negocio.

**RF-135.** La disponibilidad visual se derivará de condiciones operativas y GPS validado:

- Verde: disponible, operativo y dentro de 200 metros.
- Amarillo: en entrega o regresando.
- Rojo: no operativo o no asignable.

**RF-136.** La interfaz no será fuente de autoridad para la disponibilidad. El backend validará posición, frescura y condiciones.

**RF-137.** No habrá rastreo GPS en tiempo real para clientes en el MVP.

**RF-138.** El repartidor registrará intentos fallidos, motivo, observación y evidencia opcional.

**RF-139.** Los motivos incluirán cliente ausente, sin respuesta, dirección incorrecta, rechazo del cliente u otro.

**RF-140.** Se permitirán máximo dos intentos de entrega.

**RF-141.** Después del primer intento fallido, el operador podrá programar un segundo intento.

**RF-142.** El segundo intento podrá programarse el mismo día o hasta dos días hábiles después, según calendario operativo.

**RF-143.** Después del segundo intento fallido, el pedido regresará al negocio para decisión del operador.

**RF-144.** Cada intento conservará fecha/hora, repartidor, resultado, motivo y observaciones.

**RF-145.** La confirmación de entrega incluirá receptor, fecha/hora del sistema, repartidor y confirmación; fotografía y observaciones serán opcionales.

**RF-146.** Las entregas e intentos quedarán asociados al pedido, ruta y repartidor.

**RF-147.** El operador podrá reprogramar entregas afectadas por cierres extraordinarios, definiendo nueva fecha y franja horaria conforme al calendario operativo.

**RF-148.** El cliente será notificado por correo de la reprogramación y podrá consultar la nueva programación en su portal.

### 4.9 Calendario operativo y cierres

**RF-149.** Los clientes podrán crear pedidos en cualquier momento, incluso fuera de horario, festivos o cierres.

**RF-150.** La gestión y preparación comenzarán según el calendario operativo configurado por el administrador.

**RF-151.** El administrador podrá configurar días laborables, horarios, festivos, vacaciones y cierres especiales.

**RF-152.** El cliente recibirá un aviso indicando cuándo comenzará la gestión del pedido, según el próximo período operativo.

**RF-153.** Los plazos de reserva y pago continuarán aplicándose según las reglas aprobadas, independientemente del horario comercial.

**RF-154.** Los cambios de calendario no alterarán retroactivamente pedidos ni registros existentes.

**RF-155.** Las modificaciones del calendario quedarán auditadas con responsable, fecha, valores anteriores y nuevos.

**RF-156.** El administrador podrá registrar cierres extraordinarios por averías, emergencias u otras situaciones imprevistas.

**RF-157.** Durante un cierre extraordinario se mostrará un aviso a los clientes.

**RF-158.** Se permitirá crear pedidos durante el cierre, informando fecha de reapertura si está definida.

**RF-159.** No se programarán nuevas preparaciones ni entregas durante el cierre.

**RF-160.** Si el cierre afecta pedidos en preparación o asignados a una ruta, se generará una incidencia para el operador.

**RF-161.** El operador evaluará cada caso y coordinará continuación o reprogramación. No habrá cancelación automática.

**RF-162.** El administrador podrá registrar la reapertura del negocio.

### 4.10 Inventario y lotes

**RF-163.** La unidad base de inventario será el envase individual.

**RF-164.** El inventario se separará por producto, presentación, sabor y lote.

**RF-165.** Cada entrada registrará lote, fecha de vencimiento, cantidad recibida y fecha de ingreso.

**RF-166.** Cada lote tendrá identificador interno único autogenerado y código de fabricante opcional.

**RF-167.** El backend asignará automáticamente lotes mediante FEFO (First Expired, First Out).

**RF-168.** El operador podrá consultar las asignaciones FEFO durante preparación, pero no modificarlas manualmente.

**RF-169.** Un pedido podrá consumir unidades de varios lotes si uno no tiene cantidad suficiente.

**RF-170.** Las asignaciones se realizarán en transacción SQL y solo sobre lotes vigentes y aptos.

**RF-171.** Los productos vencidos no podrán venderse, reservarse, prepararse ni entregarse.

**RF-172.** La baja por vencimiento será automática, idempotente y sin duplicar movimientos.

**RF-173.** Se generarán alertas de vencimiento a siete días, tres días y el día de vencimiento.

**RF-174.** El administrador y operador consultarán las alertas en sus portales; el administrador recibirá correo.

**RF-175.** Las unidades próximas a vencer podrán venderse hasta su fecha de vencimiento si permanecen aptas.

**RF-176.** La preparación volverá a validar la vigencia de los lotes.

**RF-177.** Si un lote vence durante la reserva o preparación, el sistema reasignará las unidades a otros lotes vigentes mediante FEFO.

**RF-178.** Si no existe inventario apto suficiente, se generará una incidencia para el operador.

**RF-179.** El inventario diferenciará cantidades físicas, reservadas y disponibles.

**RF-180.** El stock disponible excluirá unidades vencidas, dañadas, no aptas, en cuarentena o pendientes de inspección.

**RF-181.** Las reservas comprometidas no podrán venderse a otros clientes.

**RF-182.** Al liberar una reserva, las unidades solo volverán a estar disponibles si el lote sigue vigente y apto.

**RF-183.** El administrador podrá registrar ajustes manuales con cantidad anterior, nueva, diferencia, motivo obligatorio, responsable y fecha/hora.

**RF-184.** Los ajustes no podrán reducir cantidades comprometidas o reservadas de manera inconsistente.

**RF-185.** El operador podrá registrar nuevos lotes y consultar existencias, pero no realizar ajustes manuales.

**RF-186.** El repartidor no modificará inventario.

**RF-187.** Ningún usuario podrá eliminar movimientos históricos de inventario.

**RF-188.** El sistema permitirá configurar umbrales de stock bajo por producto, presentación y sabor.

**RF-189.** Las alertas de stock bajo aparecerán en los portales de administrador y operador.

**RF-190.** La alerta de stock bajo no bloqueará ventas si existe inventario apto.

**RF-191.** Se enviará correo al administrador cuando se active una alerta de stock bajo, sin repetirlo mientras permanezca activa.

**RF-192.** Si el stock se recupera y posteriormente vuelve a caer, se generará una nueva alerta.

**RF-193.** El administrador podrá poner un lote completo en cuarentena preventiva, registrando motivo, responsable y fecha.

**RF-194.** Un lote en cuarentena no podrá venderse, reservarse, prepararse ni entregarse.

**RF-195.** Si existen pedidos o reservas afectados por una cuarentena, se generarán incidencias para el operador.

**RF-196.** El administrador podrá liberar el lote si se determina que es apto o autorizar su baja.

**RF-197.** El operador podrá reportar daños internos, indicando producto, lote, cantidad y motivo.

**RF-198.** Los productos dañados pasarán a cuarentena y quedarán fuera de venta.

**RF-199.** El administrador autorizará la merma correspondiente.

**RF-200.** Los productos devueltos ingresarán en cuarentena y se asociarán al pedido y lote original cuando sea posible.

**RF-201.** El operador inspeccionará productos devueltos y registrará resultado y observaciones.

**RF-202.** La inspección considerará temperatura/conservación, envase, estado físico, vencimiento y tiempo de traslado/conservación.

**RF-203.** Los resultados de inspección serán apto, no apto o pendiente.

**RF-204.** Solamente el administrador podrá autorizar reincorporación al inventario disponible.

**RF-205.** Los productos no aptos se registrarán como merma, con cantidad, responsable y motivo.

**RF-206.** El repartidor podrá registrar la devolución física, pero no inspeccionar ni autorizar reincorporación.

### 4.11 Reembolsos

**RF-207.** El cliente podrá crear tickets de devolución de dinero cuando corresponda.

**RF-208.** La solicitud y la ejecución del reembolso se gestionarán por separado.

**RF-209.** Los estados de solicitud incluirán `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED` y `REFUNDED`, manteniendo separado el estado de ejecución financiera.

**RF-210.** La aprobación de un reembolso no significará que el dinero fue transferido.

**RF-211.** El estado `REFUNDED` se asignará solo después de confirmar la transferencia.

**RF-212.** Se permitirán reembolsos totales y parciales.

**RF-213.** La suma de reembolsos no podrá superar el saldo reembolsable.

**RF-214.** Se permitirán varias devoluciones parciales con trazabilidad independiente.

**RF-215.** Cada reembolso registrará importe, referencia, fecha/hora, responsable y método cuando corresponda.

### 4.12 Paneles y seguimiento

**RF-216.** El administrador dispondrá de un panel con indicadores y accesos a pedidos, pagos, inventario, entregas, tickets, vencimientos y repartidores.

**RF-217.** El operador dispondrá de un panel con tareas ordenadas por urgencia, pagos pendientes, preparación, entregas, incidencias, inventario y alertas SLA.

**RF-218.** El repartidor dispondrá de un panel con estado operativo, geocerca, ruta, pedidos asignados, intentos, entregas y retorno al negocio.

**RF-219.** El cliente dispondrá de un panel con catálogo, carrito, pedidos, pagos, historial, direcciones, devoluciones, tickets y perfil.

**RF-220.** El cliente podrá consultar el seguimiento del pedido mediante una línea de tiempo con estados de pedido creado, pago informado, pago verificado, preparación, en camino y entregado.

**RF-221.** Se mostrarán incidencias como pago rechazado, expiración, cancelación, intento fallido, devolución al negocio y reembolso.

**RF-222.** El cliente no tendrá seguimiento GPS en tiempo real.

### 4.13 Notificaciones

**RF-223.** El sistema enviará correos de eventos importantes:

- Pedido creado e instrucciones de pago.
- Pago informado.
- Pago aprobado o rechazado.
- Inicio de preparación.
- Salida a entrega.
- Entrega confirmada.
- Expiración.
- Cancelación.
- Incidencias de entrega.
- Devolución al negocio.
- Reprogramación de entrega.

**RF-224.** Los correos evitarán saturar al cliente y se limitarán a eventos relevantes.

**RF-225.** Se conservará historial de correos enviados, pendientes y fallidos.

**RF-226.** Se evitará el envío duplicado de notificaciones.

**RF-227.** Si se alcanza la cuota del proveedor, los eventos quedarán registrados y pendientes de gestión, sin perder su trazabilidad.

**RF-228.** El sistema tendrá un centro de notificaciones internas para administrador y operador.

**RF-229.** Las notificaciones internas cubrirán nuevos pedidos, pagos y SLA, preparación, entregas sin asignar, incidencias, stock bajo, vencimientos y tickets.

**RF-230.** Las notificaciones internas se almacenarán en PostgreSQL.

**RF-231.** El portal consultará notificaciones mediante polling cada treinta segundos, configurable.

**RF-232.** El polling se detendrá o reducirá al cerrar sesión o abandonar el portal.

**RF-233.** El usuario podrá filtrar todas, leídas y no leídas.

**RF-234.** Las notificaciones leídas se conservarán durante noventa días y luego podrán archivarse o eliminarse automáticamente.

**RF-235.** Las auditorías de negocio no se eliminarán por las reglas de retención de notificaciones.

**RF-236.** No se utilizarán WebSockets en el MVP.

### 4.14 Soporte y tickets

**RF-237.** El portal cliente tendrá un centro de ayuda con preguntas frecuentes sobre registro, pedidos, pagos, cancelaciones, devoluciones, entregas y contraseñas.

**RF-238.** El administrador podrá crear, editar, publicar y desactivar artículos de ayuda.

**RF-239.** El sistema dispondrá de tickets unificados con workflows específicos para consultas, devoluciones y logística.

**RF-240.** El cliente podrá crear tickets con asunto, categoría, descripción, pedido relacionado, evidencias y número de seguimiento.

**RF-241.** Las categorías incluirán consultas generales, pedidos, pagos, entregas, cancelaciones, devoluciones y otros.

**RF-242.** Cliente y operador podrán intercambiar mensajes dentro del ticket.

**RF-243.** Los mensajes serán inmutables y conservarán autor y fecha/hora.

**RF-244.** Los colaboradores podrán agregar notas internas que no serán visibles para clientes.

**RF-245.** Cada ticket tendrá un responsable a la vez.

**RF-246.** Los tickets nuevos ingresarán a una bandeja general; el operador podrá tomarlos y el administrador asignar o reasignar.

**RF-247.** Las asignaciones conservarán responsable anterior, nuevo responsable, fecha/hora y motivo.

**RF-248.** Se manejarán prioridades baja, normal, alta y crítica.

**RF-249.** El sistema sugerirá prioridad por categoría; el operador podrá modificarla y el administrador supervisará los cambios.

**RF-250.** El administrador configurará SLA de primera respuesta y resolución por prioridad.

**RF-251.** El sistema calculará tiempos restantes y alertará próximos vencimientos y SLA vencidos.

**RF-252.** El sistema permitirá reabrir tickets cerrados dentro de un plazo configurable, registrando motivo y conservando el mismo identificador.

**RF-253.** Se distinguirán tiempos de creación y reapertura para cálculo SLA.

**RF-254.** Los tickets resueltos podrán cerrarse automáticamente si el cliente no responde durante el plazo configurado, con recordatorio previo.

**RF-255.** No se cerrarán automáticamente tickets con operaciones financieras pendientes.

**RF-256.** Se permitirán múltiples adjuntos por ticket.

**RF-257.** Los formatos propuestos son JPG, JPEG, PNG, WEBP y PDF, con límites de cantidad y tamaño configurables.

**RF-258.** Se validarán extensión y MIME real.

**RF-259.** Los archivos se almacenarán fuera de PostgreSQL, con metadatos y referencias en la base de datos.

**RF-260.** Los enlaces de acceso serán temporales y autorizados por rol.

**RF-261.** El cliente consultará su historial de tickets, conversaciones, evidencias, resoluciones y reaperturas.

**RF-262.** El cliente podrá filtrar por estado, categoría y fecha; buscar por número o asunto; ordenar por fecha y navegar mediante paginación backend.

### 4.15 Anuncios del negocio

**RF-263.** El sistema tendrá una sección de anuncios visible para clientes.

**RF-264.** El administrador podrá crear, editar, publicar, retirar y desactivar anuncios.

**RF-265.** Las categorías incluirán horarios/festivos, cierres temporales, avisos de entrega, información de productos y comunicados generales.

**RF-266.** Cada anuncio tendrá fecha/hora de publicación, fecha/hora de finalización opcional, estado y responsable de creación.

**RF-267.** Los estados serán `DRAFT`, `PUBLISHED`, `FINISHED` y `WITHDRAWN`.

**RF-268.** Los anuncios podrán publicarse inmediatamente o programarse.

**RF-269.** Los anuncios programados se publicarán automáticamente en su fecha.

**RF-270.** Los anuncios finalizarán automáticamente al llegar su fecha de finalización.

**RF-271.** El administrador podrá marcar anuncios como destacados y retirar esa condición.

**RF-272.** Los anuncios destacados tendrán mayor visibilidad en el portal cliente.

**RF-273.** Cada anuncio podrá incluir una imagen opcional.

**RF-274.** Las imágenes se validarán y almacenarán fuera de PostgreSQL, con metadatos y acceso controlado.

**RF-275.** Todos los clientes verán los mismos anuncios publicados y vigentes, sin segmentación.

**RF-276.** Los anuncios finalizados o retirados no se mostrarán a los clientes, pero permanecerán en el historial administrativo.

**RF-277.** No habrá enlaces interactivos dentro de anuncios en el MVP.

**RF-278.** No habrá notificaciones automáticas a clientes por publicación de anuncios.

**RF-279.** No habrá comentarios ni respuestas de clientes a los anuncios.

**RF-280.** Los anuncios serán un canal unidireccional de comunicación.

**RF-281.** Los cambios de anuncios quedarán auditados.

## 5. Requisitos no funcionales

### 5.1 Seguridad

**RNF-001.** Las contraseñas se almacenarán mediante hash seguro.

**RNF-002.** Los tokens de verificación y recuperación se almacenarán mediante hash.

**RNF-003.** La autenticación utilizará cookies `HttpOnly`, `Secure` y `SameSite` según el entorno.

**RNF-004.** No se almacenarán tokens de autenticación en `localStorage`.

**RNF-005.** Las autorizaciones se validarán en backend para cada recurso y operación.

**RNF-006.** Se aplicará principio de mínimo privilegio.

**RNF-007.** Los secretos se almacenarán en variables de entorno y nunca se subirán a GitHub.

**RNF-008.** Los logs no expondrán contraseñas, tokens, secretos ni información bancaria sensible.

**RNF-009.** Se aplicarán controles contra fuerza bruta, abuso y rate limiting.

**RNF-010.** Los archivos privados requerirán autorización y enlaces temporales.

### 5.2 Rendimiento y concurrencia

**RNF-011.** Consultas de catálogo y operaciones habituales de pedidos tendrán un objetivo aproximado de dos segundos bajo carga normal.

**RNF-012.** Las operaciones de inventario y pedidos deberán proteger consistencia ante concurrencia.

**RNF-013.** Las reservas, ventas, liberaciones y movimientos de inventario se ejecutarán mediante transacciones SQL adecuadas.

### 5.3 Disponibilidad y recuperación

**RNF-014.** Se priorizarán copias de seguridad automáticas diarias, si el plan gratuito del proveedor lo permite.

**RNF-015.** Se documentará retención y procedimiento de restauración.

**RNF-016.** Se realizarán pruebas periódicas de restauración.

**RNF-017.** Las condiciones reales de backup y PITR de Neon se verificarán antes de producción.

### 5.4 Auditoría y observabilidad

**RNF-018.** Se mantendrá auditoría de negocio separada de logs técnicos.

**RNF-019.** Los logs utilizarán niveles INFO, WARN y ERROR.

**RNF-020.** Incluirán timestamp, módulo y `requestId`.

**RNF-021.** El backend dispondrá de endpoint `/health`.

**RNF-022.** Las operaciones sensibles conservarán actor, acción, objeto, fecha/hora, resultado y motivo cuando corresponda.

**RNF-023.** La auditoría será inmutable; las correcciones se registrarán como nuevos eventos.

### 5.5 Usabilidad y accesibilidad

**RNF-024.** La aplicación será responsive para móvil, tableta y escritorio.

**RNF-025.** Se utilizará WCAG 2.2 AA como objetivo de accesibilidad.

**RNF-026.** La navegación deberá permitir uso mediante teclado y lectores de pantalla.

### 5.6 Internacionalización y datos

**RNF-027.** El idioma principal será español.

**RNF-028.** La zona horaria del negocio será `America/Caracas`.

**RNF-029.** Las fechas se almacenarán en PostgreSQL como `TIMESTAMPTZ` y se manejarán internamente en UTC.

**RNF-030.** La presentación de fechas utilizará la zona horaria del negocio.

**RNF-031.** Los importes monetarios utilizarán `NUMERIC`.

**RNF-032.** La moneda principal será USD y VES será informativa en el MVP.

### 5.7 Calidad y mantenimiento

**RNF-033.** Se utilizarán migraciones versionadas de base de datos.

**RNF-034.** Se mantendrán entornos separados para desarrollo y producción.

**RNF-035.** Se revisarán dependencias y vulnerabilidades, incluyendo `npm audit`.

**RNF-036.** Se implementarán pruebas unitarias, integración y E2E.

**RNF-037.** Las pruebas críticas cubrirán sobreventa, reservas, FEFO, pagos y permisos.

**RNF-038.** Se utilizarán datos ficticios en pruebas.

**RNF-039.** GitHub Actions se evaluará según los límites gratuitos.

## 6. Auditoría e historial

El sistema conservará trazabilidad de:

- Cambios de roles y cuentas.
- Cambios de productos y precios.
- Ajustes y movimientos de inventario.
- Reservas, liberaciones y ventas.
- Pagos y verificaciones.
- Cancelaciones y devoluciones.
- Reembolsos.
- Asignaciones y reasignaciones de repartidores.
- Intentos y entregas.
- Cambios de calendario y cierres.
- Tasas USD/VES.
- Tickets y asignaciones.
- Anuncios y modificaciones.
- Cambios de configuración del negocio.

Cada evento relevante incluirá actor, fecha/hora, acción, objeto, resultado y motivo cuando corresponda.

## 7. Configuración administrativa del negocio

El administrador podrá configurar:

- Nombre, logo, dirección y coordenadas.
- Teléfono y correo.
- Moneda y zona horaria.
- Horarios, días laborables y calendario.
- Radios y zonas de cobertura.
- Tarifas de envío y mínimo de envío gratuito.
- Umbrales de stock bajo.
- Datos bancarios para pagos.
- Configuración de archivos.
- Configuraciones operativas aplicables.

Los cambios sensibles quedarán auditados y los datos bancarios tendrán permisos restringidos.

## 8. Funcionalidades fuera del MVP

Se reservan para fases posteriores:

- Aplicaciones Android e iOS nativas.
- PWA.
- Integración automática con API del BCV u otros proveedores de cambio.
- Pagos multimoneda.
- Pasarela de pagos.
- WhatsApp y Telegram.
- Rastreo GPS en tiempo real para clientes.
- Favoritos.
- Cupones y promociones mediante códigos.
- Programa de puntos y recompensas.
- Comentarios y respuestas a anuncios.
- Enlaces interactivos en anuncios.
- Notificaciones automáticas a clientes por publicación de anuncios.
- Archivo histórico de anuncios visible para clientes.
- Segmentación de anuncios.
- Valoración de atención de tickets.
- Bandeja avanzada de colaboradores.
- Sistema administrativo de suspensión/bloqueo de clientes.
- Módulo de proveedores y compras de materias primas.
- Fabricación, recetas y costos de producción.
- Valoración avanzada de inventario.
- Expansión a múltiples ciudades y negocios.
- Business Intelligence avanzado.

### 8.1 Power BI

Se contempla una fase futura para integrar Power BI.

La arquitectura prevista será:

React → API → PostgreSQL → vistas SQL de reporting → Power BI Desktop.

Los reportes podrán cubrir ventas, inventario, entregas, clientes, operadores y finanzas.

Se priorizará acceso de solo lectura a vistas de reporting y se evitará cargar innecesariamente las tablas operativas.

Power BI Desktop permitirá desarrollar archivos `.pbix` localmente. La publicación y colaboración en Power BI Service dependerá de los planes y licencias disponibles.

## 9. Decisiones y parámetros pendientes

Los siguientes valores deberán definirse antes de la etapa de implementación que dependa de ellos:

| Parámetro                                  | Estado                                            |
| ------------------------------------------ | ------------------------------------------------- |
| Dirección exacta y coordenadas del negocio | Pendiente                                         |
| Radios y zonas reales de cobertura         | Pendiente                                         |
| Tarifas de envío                           | Pendiente                                         |
| Importe mínimo para envío gratuito         | Pendiente                                         |
| Horarios reales del negocio                | Pendiente                                         |
| Festivos y calendario específico           | Pendiente                                         |
| Datos bancarios receptores                 | Pendiente                                         |
| Umbrales iniciales de stock bajo           | Pendiente                                         |
| Proveedor de correo y cuotas               | Pendiente                                         |
| Proveedor de almacenamiento de archivos    | Pendiente                                         |
| Proveedor de mapas/geocodificación         | Pendiente                                         |
| Límites definitivos de archivos            | Pendiente                                         |
| Política legal de conservación de datos    | Pendiente de revisión para jurisdicción aplicable |
| Retención y condiciones de backup          | Pendiente de verificación del proveedor           |

Estos parámetros no impedirán diseñar la arquitectura general, pero deberán definirse antes de implementar las funcionalidades que los requieran.

## 10. Criterios generales de aceptación

El MVP se considerará funcionalmente aceptable cuando:

1. Los clientes puedan registrarse, verificar su correo y autenticarse.
2. Los roles y permisos se apliquen correctamente.
3. El catálogo permita consultar productos, presentaciones, sabores, precios y disponibilidad.
4. El carrito persista y no reserve stock.
5. Los pedidos se creen con validaciones de precios, inventario, dirección y envío.
6. Se impida la sobreventa y la creación de pedidos activos duplicados.
7. Los pagos manuales puedan informarse, verificarse y auditarse.
8. El inventario utilice lotes, FEFO y controles de vencimiento.
9. Las entregas respeten asignaciones, geocerca e intentos permitidos.
10. Las incidencias, devoluciones y reembolsos conserven trazabilidad.
11. Los clientes puedan consultar pedidos y tickets propios.
12. El administrador pueda gestionar la tasa USD/VES y su historial.
13. El calendario operativo y los cierres extraordinarios funcionen según las reglas aprobadas.
14. Los anuncios respeten vigencia, destacados y visibilidad general.
15. Los controles de seguridad, auditoría, accesibilidad y pruebas estén implementados.

## 11. Metodología de evolución de requisitos

Los requisitos podrán cambiar durante el desarrollo.

Cada cambio deberá:

1. Identificar el requisito afectado.
2. Explicar la necesidad y el motivo.
3. Evaluar el impacto sobre base de datos, API, frontend, seguridad y pruebas.
4. Aprobarse antes de implementarse.
5. Actualizar este documento y su versión.
6. Mantener trazabilidad de la decisión.

No se modificarán silenciosamente decisiones previamente aprobadas.

## 12. Roadmap del proyecto

| Fase | Descripción                    | Estado     |
| ---- | ------------------------------ | ---------- |
| 0    | Preparación del entorno        | Completada |
| 1    | Ingeniería de requisitos       | Cerrada    |
| 2    | Diseño de base de datos        | Siguiente  |
| 3    | Fundamentos Node.js y Express  | Pendiente  |
| 4    | PostgreSQL y Neon              | Pendiente  |
| 5    | Arquitectura backend           | Pendiente  |
| 6    | Autenticación y autorización   | Pendiente  |
| 7    | React y Vite                   | Pendiente  |
| 8    | Catálogo, inventario y pedidos | Pendiente  |
| 9    | Portal administrativo          | Pendiente  |
| 10   | Pagos y notificaciones         | Pendiente  |
| 11   | Testing y seguridad            | Pendiente  |
| 12   | Despliegue y DevOps            | Pendiente  |
| 13   | Power BI y análisis de datos   | Futuro     |

---

**Fin del documento — YoguMarket ERS v0.5**
