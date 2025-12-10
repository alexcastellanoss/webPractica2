# Alejandro Castellanos - Proyecto Web 2

# Ficheros

## app/layout.js

Layout principal de la aplicación.  
Define la estructura base y renderiza el contenido de cada página mediante `children`.

---

## app/page.js (Login)

Página de inicio donde el usuario ve el botón para iniciar sesión con Spotify.  
Cuando el login termina, el usuario es redirigido al dashboard.

---

## app/dashboard/layout.js

Layout específico para el dashboard.

---

## app/dashboard/page.js (Dashboard principal)

Este archivo es el **centro de la lógica de la aplicación**.  
Aquí controlamos el estado global del dashboard:

- qué widget está seleccionado (`activeWidget`)
- datos seleccionados en cada widget (artistas, géneros, décadas, popularidad, mood)
- la playlist generada
- favoritos guardados en `localStorage`

Los widgets no generan playlist por sí solos.  
Cada widget llama a una función del dashboard, pasándole sus valores.  
El dashboard guarda esos valores en su estado.  

Cuando el usuario pulsa “Generar playlist”, el dashboard usa todas las preferencias juntas para crear la playlist y la envía a `PlaylistDisplay` como prop.

---

## components/Header.jsx

Componente sencillo que muestra el encabezado del dashboard.  
Incluye el botón de logout.

---

## components/Menu.jsx

Este componente muestra la lista de widgets disponibles (Artistas, Canciones, Géneros, etc.).  
Al hacer clic en uno, llama a `onChangeWidget(name)` que recibe del dashboard.  
El dashboard actualiza `activeWidget` y muestra el widget correspondiente.

---

## components/SliderRow.jsx

Este componente es un slider individual para valores numéricos (por ejemplo, energía o valencia).  
Lo usamos dentro de `MoodWidget`.  
Recibe props como `label`, `value` y `onChange`.  
Cuando el usuario mueve el slider, llama `onChange(newValue)` para avisar al widget de que el valor ha cambiado.

---

## components/PlaylistDisplay.jsx

Este componente muestra la playlist generada.  
Recibe desde el dashboard un array de canciones: `tracks`.

Cada elemento del array se renderiza con `TrackCard`.  
También recibe funciones del dashboard:

- `onRemoveTrack(id)`
- `onToggleFavorite(track)`
- `isTrackFavorite`

---

## components/TrackCard.jsx

Componente visual que representa una canción (portada, título y artista).  
Tiene dos botones:

- Favorito
- Eliminar

No modifica nada directamente.  
Cuando el usuario hace clic, llama a las funciones que recibe como props desde `PlaylistDisplay`, que vienen originalmente del dashboard: `onRemove(track.id)` y `onToggleFavorite(track)`.

---

# Widgets

Todos los widgets funcionan igual:

- tienen estado local (inputs del usuario)
- y devuelven sus valores al dashboard mediante `onChange`

El dashboard guarda esos valores en su estado global y luego genera la playlist usando todo junto.

---

## ArtistWidget.jsx

Permite buscar artistas con la API de Spotify y seleccionar varios.  
Internamente guarda la lista de artistas elegidos y la envía al dashboard cada vez que hay cambios.

---

## TrackWidget.jsx

Igual que el de artistas, pero buscando canciones.  
Permite seleccionar varias canciones como favoritas iniciales.  
Envía las canciones al dashboard.

---

## GenreWidget.jsx

Muestra un listado de géneros musicales.  
Aquí no llamamos a la API, usamos una lista fija.  
Cuando el usuario selecciona o deselecciona géneros, envía los cambios al dashboard y se guarda en las preferencias.

---

## DecadeWidget.jsx

Permite elegir décadas (70s, 80s…).

---

## MoodWidget.jsx

Controla parámetros musicales como energía y valencia usando sliders.  
Usa `SliderRow`.

---

## PopularityWidget.jsx

Representa un slider de rango de popularidad (0 a 100).  
Cuando cambia, envía `{ popularity: { min, max } }`.

---

La estructura de comunicación es siempre de abajo hacia arriba:

1. Widget → envía su estado al dashboard  
2. Dashboard → guarda todos los parámetros

Así el dashboard siempre tiene toda la información en su estado, y se decide ahí cuándo generar la playlist.

---

## app/loading.jsx

Muestra una pantalla mientras cualquier ruta carga.  
No tiene lógica.

---

## app/not-found.jsx

Muestra una página 404 si se navega a una ruta inexistente.

---

## Responsive

La interfaz se adapta a móvil, tablet y desktop:

- la grid del dashboard cambia entre 1 y 2 columnas
- TrackCard usa `h-full` para igualar alturas
- menús y botones se adaptan al ancho

---

## Conclusión

En resumen, el proyecto consiste en conectar la lógica de los widgets con el dashboard, generar la playlist con la información del usuario y mostrarla. 
Comunicación: **los widgets actualizan el dashboard mediante props**, y el dashboard controla toda la funcionalidad de la aplicación.

---

## Backend y lógica interna

Al hacer login usamos `lib/auth.js`, porque ahí tenemos la parte que construye la URL de inicio de sesión con Spotify y la gestión básica de los tokens en el cliente (guardar y leer el token cuando lo necesitamos).

Después del login usamos las API Routes `api/spotify-token/route.js` y `api/refresh-token/route.js`, que son las encargadas de hablar con Spotify desde el servidor para obtener los tokens y renovarlos cuando hace falta, sin exponer datos sensibles en el frontend.

Al generar la playlist usamos `lib/spotify.js`, porque en ese fichero centralizamos las funciones que llaman a la Web API de Spotify. Desde el dashboard le pasamos las preferencias que vienen de los widgets (artistas, géneros, décadas, popularidad y mood), y `lib/spotify.js` devuelve la lista de canciones que luego mostramos en `PlaylistDisplay`.


