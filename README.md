# Abogados del Bío Bío

Sitio web corporativo y operativo para el estudio jurídico Abogados del Bío Bío. El proyecto está construido con Next.js usando Pages Router e incluye:

- Sitio público institucional.
- Blog público con mantenedor autenticado.
- Formulario de contacto por correo.
- Agenda de consultas con validación de disponibilidad.
- Integración de pago con Flow para consultas pagadas.
- Persistencia local en JSON mediante `lowdb`.

## Stack

- Next.js 14
- React 18
- TypeScript
- MUI 6
- lowdb
- Nodemailer
- Flow API
- Bun para build/deploy en contenedor
- jQuery + plugins legacy del template visual

## Prerrequisitos

- Node.js 20+ o Bun 1.1+
- npm 10+ o Bun
- Docker y Docker Compose si se va a levantar en contenedor
- Credenciales reales de SMTP
- Credenciales Flow sandbox y/o producción si se usará agenda con pago

## Gestor de paquetes recomendado

El repositorio mantiene `bun.lockb` y la imagen Docker usa Bun. Se recomienda usar Bun también en local para evitar diferencias entre dependencias resueltas por `npm` y por `bun`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run check
```

Notas:

- `check` ejecuta `depcheck`.
- No hay suite de tests automatizados en el repositorio.
- En desarrollo Next usa `.next-dev` y en build usa `.next`, para evitar colisiones entre `next dev` y `next build`.

## Estructura del proyecto

```text
.
├── src/
│   ├── components/        # Componentes UI, blog, admin y voucher
│   ├── interfaces/        # Tipos del dominio
│   ├── layouts/           # Layout base del sitio
│   ├── lib/               # DB local, formateador y configuración compartida
│   ├── pages/             # Rutas web y API routes de Next.js
│   ├── styles/            # Estilos globales
│   └── utils/             # Email, auth middleware, pagos
├── public/                # Assets públicos y uploads
├── db.json                # Base de datos local en desarrollo
├── Dockerfile
├── docker-compose.yml
├── build.yml              # Despliegue Swarm/Traefik
└── .gitlab-ci.yml
```

## Cómo funciona

### Sitio público

Las páginas públicas están bajo `src/pages` y usan el layout compartido definido en `src/pages/_app.tsx` y `src/layouts/BaseLayout.tsx`.

### Blog

- El listado público consume `GET /api/blogs?page=&limit=`.
- El home y la barra lateral consumen `GET /api/blogs/latest`.
- El detalle consume `GET /api/blogs/:postId`.
- El mantenedor de blog está en `/blog/list` y requiere sesión.
- La creación y edición de posts aceptan `multipart/form-data`.
- Las imágenes del blog se guardan en `public/uploads`.
- Límite de imagen en creación: 5 MB.

### Agenda de consultas

El flujo de agenda funciona así:

1. La página `/agendarConsulta` consulta los bloques ocupados en `GET /api/consultas`.
2. El usuario envía el formulario a `POST /api/consultas`.
3. Si la consulta es:
   - `laboral`: se crea sin pago.
   - `civil` o `familiar`: genera pago por `30000 CLP`.
   - `penal`: genera pago por `40000 CLP`.
4. Para consultas pagadas se genera un link de Flow y se envía por correo al cliente.
5. El estado se consulta en `/solicitud/:id`, que a su vez consume `GET /api/consultas/:id`.
6. Cuando Flow confirma o cuando el estado se revisa y el pago ya está aprobado, la consulta pasa a `pagada` y se notifican cliente y administrador.

### Autenticación

- El login está en `/auth`.
- `POST /api/users/auth` crea una cookie `token`.
- `GET /api/users/auth` destruye la cookie y cierra sesión.
- El mantenedor de blog y los endpoints de edición/creación están protegidos con cookie + JWT.
- En desarrollo la cookie se emite para `localhost` sin `domain`.
- En producción la cookie usa el dominio configurado en `DOMAIN`.
- `POST /api/users/register` también está protegido, por lo que el primer administrador debe existir previamente en `db.json` o cargarse manualmente.

## Rutas web

| Ruta | Archivo | Descripción |
| --- | --- | --- |
| `/` | `src/pages/index.tsx` | Home institucional con resumen del estudio y últimas entradas. |
| `/blog` | `src/pages/blog/index.tsx` | Listado público del blog con paginación. |
| `/blog/[postId]` | `src/pages/blog/[postId].tsx` | Detalle de una entrada. |
| `/blog/list` | `src/pages/blog/list.tsx` | Mantenedor de blog. Requiere autenticación. |
| `/contact` | `src/pages/contact/index.tsx` | Formulario de contacto. |
| `/auth` | `src/pages/auth/index.tsx` | Inicio de sesión. |
| `/agendarConsulta` | `src/pages/agendarConsulta/index.tsx` | Reserva de hora y generación de pago. |
| `/solicitud/buscar` | `src/pages/solicitud/buscar.tsx` | Búsqueda manual por ID de solicitud. |
| `/solicitud/[id]` | `src/pages/solicitud/[id].tsx` | Voucher y estado de una consulta. |

## API Routes

| Método | Ruta | Archivo | Descripción |
| --- | --- | --- | --- |
| `GET` | `/api/blogs` | `src/pages/api/blogs/index.ts` | Lista paginada de entradas. |
| `GET` | `/api/blogs/latest` | `src/pages/api/blogs/latest.ts` | Devuelve las 3 entradas más recientes. |
| `GET` | `/api/blogs/:postId` | `src/pages/api/blogs/[postId].ts` | Devuelve una entrada por ID. |
| `POST` | `/api/blogs/register` | `src/pages/api/blogs/register.ts` | Crea una entrada con imagen. Requiere auth. |
| `PUT` | `/api/blogs/admin/:postId` | `src/pages/api/blogs/admin/[postId].ts` | Edita una entrada. Requiere auth. |
| `DELETE` | `/api/blogs/admin/:postId` | `src/pages/api/blogs/admin/[postId].ts` | Elimina una entrada. Requiere auth. |
| `GET` | `/api/consultas` | `src/pages/api/consultas/index.ts` | Lista consultas agendadas. |
| `POST` | `/api/consultas` | `src/pages/api/consultas/index.ts` | Crea una consulta y, si aplica, inicia el pago. |
| `GET` | `/api/consultas/:id` | `src/pages/api/consultas/[id].ts` | Consulta el estado y sincroniza pago. |
| `POST` | `/api/confirmation` | `src/pages/api/confirmation/index.ts` | Endpoint de confirmación de pago desde Flow. |
| `POST` | `/api/mail` | `src/pages/api/mail/index.ts` | Envía el formulario de contacto al correo administrador. |
| `POST` | `/api/users/auth` | `src/pages/api/users/auth.ts` | Inicia sesión. |
| `GET` | `/api/users/auth` | `src/pages/api/users/auth.ts` | Cierra sesión. |
| `POST` | `/api/users/register` | `src/pages/api/users/register.ts` | Crea usuarios autenticados para administración. |

## Persistencia de datos

La aplicación no usa una base de datos relacional. Toda la persistencia se maneja con `lowdb`.

- Desarrollo: `db.json`
- Producción: `/app/db/db.json`

Colecciones principales:

- `users`
- `blogs`
- `consultas`

Subidas de imágenes:

- Se almacenan en `public/uploads`
- En contenedor se espera persistencia montando `/app/public/uploads`

## Variables de entorno

El proyecto incluye un ejemplo en `.env.example`.

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `NODE_ENV` | Sí | `development` o `production`. |
| `APP_URL` | Recomendado | URL pública base, por ejemplo `https://abogadosdelbiobio.cl`. |
| `DOMAIN` | Recomendado | Dominio para cookies, sin protocolo. |
| `ADMIN_EMAIL` | Sí | Correo administrador que recibe contactos y notificaciones. |
| `JWT_SECRET` | Sí en producción | Firma de la cookie JWT. |
| `SMTP_HOST` | Sí | Host SMTP. |
| `SMTP_PORT` | Sí | Puerto SMTP. |
| `SMTP_SECURE` | Sí | `true` o `false`. |
| `SMTP_USER` | Sí | Usuario SMTP. |
| `SMTP_PASS` | Sí | Password SMTP. |
| `SMTP_FROM` | Sí | Remitente de correo. |
| `FLOW_API_KEY_SANDBOX` | Sí en desarrollo con pagos | API key sandbox de Flow. |
| `FLOW_SECRET_KEY_SANDBOX` | Sí en desarrollo con pagos | Secret sandbox de Flow. |
| `FLOW_API_KEY_PROD` | Sí en producción con pagos | API key productiva de Flow. |
| `FLOW_SECRET_KEY_PROD` | Sí en producción con pagos | Secret productivo de Flow. |
| `FLOW_ENDPOINT_SANDBOX` | No | Override del endpoint sandbox. |
| `FLOW_ENDPOINT_PROD` | No | Override del endpoint productivo. |

### Variables mínimas por entorno

#### Desarrollo sin pagos

```env
NODE_ENV=development
APP_URL=http://localhost:3000
ADMIN_EMAIL=tu-correo@example.com
JWT_SECRET=un-secreto-largo
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@example.com
SMTP_PASS=secret
SMTP_FROM=noreply@example.com
```

#### Desarrollo con pagos

Agregar además:

```env
FLOW_API_KEY_SANDBOX=...
FLOW_SECRET_KEY_SANDBOX=...
```

#### Producción

Agregar además:

```env
NODE_ENV=production
APP_URL=https://abogadosdelbiobio.cl
DOMAIN=abogadosdelbiobio.cl
FLOW_API_KEY_PROD=...
FLOW_SECRET_KEY_PROD=...
```

## Desarrollo local

1. Instalar dependencias:

```bash
bun install
```

También puedes usar `npm install`, pero el repositorio ya incluye `bun.lockb` y el contenedor usa Bun.

2. Crear archivo de entorno:

```bash
cp .env.example .env
```

3. Ajustar variables reales para correo, JWT y Flow.

4. Ejecutar:

```bash
bun run dev
```

5. Abrir:

```text
http://localhost:3000
```

### Reinicio limpio de desarrollo

Si el frontend queda con chunks viejos, HMR inconsistente o comportamientos extraños:

```bash
rm -rf .next-dev
bun run dev
```

### Primer acceso administrativo

El backend no expone un registro público de usuarios.

- Si `db.json` ya contiene usuarios administradores, se puede iniciar sesión con esas cuentas.
- Si no existe un usuario válido, el primer admin debe agregarse manualmente en `db.json` con password ya hasheado con `bcrypt`.
- Una vez autenticado un administrador, puede crear más usuarios usando `POST /api/users/register`.

## Docker local

El repositorio incluye `docker-compose.yml` para levantar un contenedor de la app detrás de Traefik.

```bash
docker compose up --build
```

El servicio monta:

- `../volumes/uploads:/app/public/uploads`
- `../volumes/db:/app/db`

Antes de usarlo en local o servidor, asegúrate de que el contenedor tenga acceso a las variables de entorno necesarias mediante `.env` o configuración del stack.

### Consideraciones sobre `docker-compose.yml`

- Está orientado a un entorno con reverse proxy ya existente.
- Usa `network_mode: "reverse-proxy"`, por lo que esa red debe existir en el host.
- Si se va a usar fuera de ese entorno, probablemente haya que adaptar:
  - `network_mode`
  - labels de Traefik
  - dominio
  - volúmenes relativos

### Build manual de Docker

```bash
docker build -t abogadosdelbiobio .
docker run --rm -p 3000:3000 --env-file .env abogadosdelbiobio
```

## Deploy

### Opción 1: `docker-compose.yml`

Pensado para un despliegue simple con Traefik y un contenedor `abogadosdelbiobio`.

### Opción 2: `build.yml`

Archivo orientado a Docker Swarm con:

- red externa `swarm-proxy`
- labels de Traefik
- volúmenes persistentes en `/volumes/abogadosdelbiobio`

### Opción 3: GitLab CI

El pipeline en `.gitlab-ci.yml`:

- instala dependencias con Bun
- ejecuta `bun run check`
- compila con `bun run build`
- despliega por SSH en stage o producción

Importante:

- El pipeline espera archivos no versionados en este repositorio:
  - `.env.production`
  - `.env.stage`
  - `docker-compose.prod.yml`
  - `docker-compose.stage.yml`
- Si esos archivos no existen en la rama desplegada, el job remoto fallará.
- La variable `PROJECT_PATH` en `.gitlab-ci.yml` debe revisarse antes de usar el pipeline tal como está.

## Payloads esperados

### `POST /api/users/auth`

```json
{
  "email": "admin@example.com",
  "password": "tu-password"
}
```

### `POST /api/mail`

```json
{
  "nombre": "Nombre Apellido",
  "correo": "cliente@example.com",
  "asunto": "Consulta",
  "mensaje": "Texto del mensaje"
}
```

### `POST /api/consultas`

```json
{
  "fecha": "24-03-2026 16:00",
  "tipoConsulta": "familiar",
  "nombre": "Nombre Cliente",
  "correo": "cliente@example.com",
  "telefono": "987654321"
}
```

Valores válidos de `tipoConsulta`:

- `familiar`
- `penal`
- `civil`
- `laboral`

### `POST /api/blogs/register`

Request:

- `Content-Type: multipart/form-data`
- Campos:
  - `title`
  - `author`
  - `description`
  - `content`
  - `image`

### `PUT /api/blogs/admin/:postId`

Request:

- `Content-Type: multipart/form-data`
- Campos:
  - `title`
  - `author`
  - `description`
  - `content`
  - `image` opcional

## Consideraciones operativas

- El proyecto está diseñado para correr en una sola instancia.
- `lowdb` sobre JSON no es apropiado para escrituras concurrentes o escalado horizontal.
- La limpieza de consultas no pagadas se hace con `setTimeout`; si el proceso reinicia, esa limpieza no está garantizada.
- La primera carga administrativa depende de los usuarios presentes en `db.json` o de un flujo autenticado para `POST /api/users/register`.
- `db.json` puede contener datos reales de desarrollo; no debería usarse como respaldo ni como mecanismo de seed en producción sin revisión.
- El sitio aún usa scripts y plugins legacy del template. Si se tocan `_document`, `LegacyScripts` o `main.js`, conviene probar navegación, sliders y menú móvil.
- El frontend depende de assets estáticos del template bajo `public/static/assets`.
- La pantalla de carga inicial se controla desde React, no desde jQuery.

## Troubleshooting

### El login responde `200` pero no mantiene sesión en local

- Verificar que se esté navegando en `http://localhost:3000`.
- En desarrollo, la cookie no usa `DOMAIN`.
- Si cambiaste `.env`, reinicia `bun run dev`.

### La app queda en el preloader o hay errores de chunks

Ejecutar:

```bash
rm -rf .next-dev
bun run dev
```

### Errores de jQuery, Bootstrap o Slick

- Verificar que no se hayan removido scripts en `src/pages/_document.tsx`.
- Verificar que `src/components/LegacyScripts.tsx` siga cargando `main.js`.

### No se puede crear el primer usuario admin

- `POST /api/users/register` requiere sesión.
- Si no existe un admin inicial, agregarlo manualmente a `db.json`.

### El blog no guarda imágenes

- Verificar permisos de escritura en `public/uploads` en local.
- Verificar montaje de `/app/public/uploads` en Docker/Swarm.

### Las consultas o blogs “desaparecen”

- En desarrollo los datos viven en `db.json`.
- En producción dependen del volumen montado en `/app/db`.
- Si no hay volumen persistente, los datos se perderán al recrear el contenedor.

## Archivos clave

- `src/lib/config.ts`: lectura centralizada de variables de entorno.
- `src/lib/db.ts`: acceso a `lowdb`.
- `src/utils/email.ts`: transporte SMTP.
- `src/utils/pago.ts`: integración Flow.
- `src/utils/middlewares.ts`: middleware de autenticación.
- `src/pages/api/consultas/index.ts`: creación de consultas y link de pago.
- `src/pages/api/consultas/[id].ts`: consulta de estado y notificaciones.

## Estado actual del endurecimiento

Se corrigieron estas áreas en esta versión del repositorio:

- secretos SMTP y Flow fuera del código fuente
- secret JWT centralizado
- cookie de auth con dominio opcional y configuración compartida
- protección SSR del mantenedor de blog
- prevención de correos duplicados al revisar una consulta pagada
- `README` alineado con el código real del proyecto
- separación entre artefactos de `next dev` y `next build`
- preloader controlado por React para no depender del evento `window.load`
