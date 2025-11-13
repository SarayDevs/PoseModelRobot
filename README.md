# 🤖 Robot Pose Detector

Una aplicación web interactiva que utiliza **Teachable Machine** para detectar poses en tiempo real y animar un adorable robot estilo chibi tipo Wall-E que mueve sus brazos según tus movimientos.

![Robot Pose Detector](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)

## 📋 Descripción

Este proyecto combina **Teachable Machine** con **TensorFlow.js** para crear una experiencia interactiva donde un robot animado responde a tus poses en tiempo real. El robot detecta cuando levantas el brazo derecho, izquierdo, ambos, o cuando no hay una pose clara, y anima sus brazos en consecuencia.

## ✨ Características

- 🤖 **Robot animado estilo chibi Wall-E**: Diseño tierno y compacto con ojos grandes y expresivos
- 🎯 **Detección de poses en tiempo real**: Utiliza PoseNet y un modelo personalizado de Teachable Machine
- 🎨 **Animaciones fluidas**: Los brazos del robot se levantan suavemente según las poses detectadas
- 📹 **Widget de cámara flotante**: Visualización de la cámara en un widget que puedes ocultar/mostrar
- 📱 **Diseño responsive**: Funciona perfectamente en desktop, tablet y móvil
- 🎭 **4 clases de detección**:
  - **Derecha**: El robot levanta su brazo derecho
  - **Izquierda**: El robot levanta su brazo izquierdo
  - **Ambos**: El robot levanta ambos brazos
  - **Indeterminado**: El robot permanece en posición neutral

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones avanzadas
- **JavaScript (ES6+)**: Lógica de la aplicación
- **TensorFlow.js v1.3.1**: Framework de machine learning
- **Teachable Machine Pose v0.8**: Biblioteca para detección de poses
- **PoseNet**: Modelo base para estimación de poses

## 📁 Estructura del Proyecto

```
Poses/
│
├── index.html              # Página principal
├── styles.css              # Estilos y animaciones
├── script.js               # Lógica de la aplicación
├── README.md               # Este archivo
│
└── my-pose-model/          # Modelo de Teachable Machine
    ├── model.json          # Arquitectura del modelo
    ├── metadata.json       # Metadatos y clases del modelo
    └── weights.bin         # Pesos entrenados del modelo
```

## 🚀 Requisitos Previos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Cámara web funcional
- Conexión a internet (para cargar las librerías de TensorFlow.js)
- Un servidor web local (ver sección de instalación)

## 📦 Instalación

### Opción 1: Python (Recomendado)

Si tienes Python instalado:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre tu navegador en: `http://localhost:8000`

### Opción 2: Node.js

Si tienes Node.js instalado:

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
http-server -p 8000
```

Luego abre tu navegador en: `http://localhost:8000`

### Opción 3: VS Code Live Server

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 4: PHP

Si tienes PHP instalado:

```bash
php -S localhost:8000
```

## 🎮 Uso

1. **Inicia el servidor local** usando una de las opciones anteriores

2. **Abre la aplicación** en tu navegador navegando a `http://localhost:8000`

3. **Haz clic en "Iniciar Detección"** para cargar el modelo y activar la cámara

4. **Permite el acceso a la cámara** cuando tu navegador lo solicite

5. **Mueve tus brazos**:
   - Levanta tu **brazo derecho** → El robot levanta su brazo derecho
   - Levanta tu **brazo izquierdo** → El robot levanta su brazo izquierdo
   - Levanta **ambos brazos** → El robot levanta ambos brazos
   - Sin pose clara → El robot permanece en posición neutral

6. **Opciones adicionales**:
   - Usa el botón "Ocultar/Mostrar" en el widget de cámara para ocultar la vista previa
   - Observa el porcentaje de confianza de cada clase en tiempo real

## 🎨 Características del Robot

El robot está diseñado con un estilo **chibi tipo Wall-E**:

- **Cabeza grande y redonda** con ojos expresivos que parpadean
- **Cuerpo compacto** con diseño metálico gris
- **Brazos articulados** que se levantan suavemente hacia arriba
- **Piernas y pies** estilo chibi
- **Animación flotante** continua para darle vida
- **Efectos de sombra y gradientes** para profundidad visual

## 🤖 Modelo de Teachable Machine

El modelo incluido (`my-pose-model/`) fue entrenado con las siguientes clases:

- **derecha**: Pose con brazo derecho levantado
- **izquierda**: Pose con brazo izquierdo levantado
- **ambos**: Pose con ambos brazos levantados
- **indeterminado**: Sin pose clara o posición neutral

### Especificaciones del Modelo

- **Versión TensorFlow.js**: 1.7.4
- **Versión Teachable Machine**: 0.8.6
- **Arquitectura PoseNet**: MobileNetV1
- **Output Stride**: 16
- **Input Resolution**: 257x257
- **Multiplier**: 0.75

### Entrenar tu Propio Modelo

Si deseas entrenar tu propio modelo:

1. Ve a [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Selecciona "Pose Project"
3. Entrena las clases que desees (derecha, izquierda, ambos, indeterminado)
4. Exporta el modelo
5. Reemplaza los archivos en la carpeta `my-pose-model/` con tus archivos exportados

## 🔧 Configuración Avanzada

### Cambiar la Ruta del Modelo

Si tu modelo está en otra ubicación, edita `script.js`:

```javascript
const URL = "./tu-carpeta-modelo/";
```

### Ajustar el Tamaño de la Cámara

En `script.js`, modifica el tamaño del canvas:

```javascript
const size = 200; // Cambia este valor (200x200 por defecto)
```

### Personalizar Animaciones

Las animaciones de los brazos están en `styles.css`. Puedes ajustar:

- Velocidad: Cambia `0.7s` en las animaciones
- Ángulo máximo: Modifica los valores en `@keyframes` (ej: `-150deg`, `150deg`)
- Suavidad: Ajusta `ease-in-out` por otras funciones de timing

## 🐛 Solución de Problemas

### La cámara no se activa

- Asegúrate de haber dado permisos de cámara al navegador
- Verifica que no haya otra aplicación usando la cámara
- Prueba en otro navegador

### El modelo no carga

- Verifica que los archivos estén en `my-pose-model/`
- Asegúrate de estar usando un servidor local (no solo abriendo el archivo)
- Revisa la consola del navegador para errores

### Las animaciones no funcionan

- Verifica que el modelo esté cargado correctamente
- Asegúrate de que las clases del modelo coincidan con las del código
- Revisa que la cámara esté detectando poses correctamente

### Problemas de rendimiento

- Reduce el tamaño del canvas de la cámara
- Cierra otras aplicaciones que usen la cámara
- Usa un navegador más reciente

## 📝 Notas Importantes

- ⚠️ **Es necesario usar un servidor local**: Los navegadores modernos bloquean la carga de modelos TensorFlow.js desde archivos locales por seguridad (CORS)
- 📹 **Permisos de cámara**: La aplicación requiere acceso a tu cámara web
- 🌐 **Conexión a internet**: Se necesita para cargar las librerías de TensorFlow.js desde CDN
- 🔒 **Privacidad**: Todo el procesamiento se hace localmente en tu navegador, no se envía información a servidores externos

## 🎯 Próximas Mejoras

- [ ] Agregar más poses y animaciones
- [ ] Mejorar la precisión del modelo
- [ ] Agregar sonidos al robot
- [ ] Implementar modo de calibración
- [ ] Guardar estadísticas de uso
- [ ] Agregar más estilos de robot

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Teachable Machine y TensorFlow.js

## 🙏 Agradecimientos

- [Teachable Machine](https://teachablemachine.withgoogle.com/) - Por la plataforma de entrenamiento
- [TensorFlow.js](https://www.tensorflow.org/js) - Por el framework de machine learning
- [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) - Por el modelo de detección de poses

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio del proyecto.

---

**¡Disfruta moviendo tus brazos y viendo al robot seguirte!** 🤖✨

