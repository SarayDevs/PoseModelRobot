// URL del modelo
const URL = "./my-pose-model/";

let model, webcam, ctx, labelContainer, maxPredictions;
let currentPrediction = "indeterminado";
let isInitialized = false;

// Elementos del DOM
const robot = document.getElementById("robot");
const leftArm = document.getElementById("leftArm");
const rightArm = document.getElementById("rightArm");
const statusDisplay = document.querySelector(".status-text");
const confidenceDisplay = document.getElementById("confidence");
const cameraWidget = document.getElementById("cameraWidget");
const toggleCameraBtn = document.getElementById("toggleCamera");
const startBtn = document.getElementById("startBtn");

// Inicializar la aplicación
async function init() {
    try {
        if (isInitialized) {
            return;
        }

        startBtn.disabled = true;
        startBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Cargando...</span>';

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // Cargar el modelo y metadata
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Configurar webcam
        const size = 200;
        const flip = true;
        webcam = new tmPose.Webcam(size, size, flip);
        await webcam.setup();
        await webcam.play();

        // Configurar canvas
        const canvas = document.getElementById("canvas");
        canvas.width = size;
        canvas.height = size;
        ctx = canvas.getContext("2d");

        // Configurar contenedor de etiquetas
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = "";
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        isInitialized = true;
        startBtn.style.display = "none";
        updateStatus("Iniciado", "Modelo cargado correctamente");

        // Iniciar loop de predicción
        window.requestAnimationFrame(loop);
    } catch (error) {
        console.error("Error al inicializar:", error);
        updateStatus("Error", "No se pudo cargar el modelo");
        startBtn.disabled = false;
        startBtn.innerHTML = '<span class="btn-icon">🔄</span><span class="btn-text">Reintentar</span>';
        alert("Error al cargar el modelo. Asegúrate de que los archivos del modelo estén en la carpeta my-pose-model/");
    }
}

// Loop principal de predicción
async function loop(timestamp) {
    if (webcam && webcam.canvas) {
        webcam.update();
        await predict();
    }
    window.requestAnimationFrame(loop);
}

// Función de predicción
async function predict() {
    if (!model || !webcam) return;

    try {
        // Predicción 1: estimar pose con PoseNet
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

        // Predicción 2: clasificar con el modelo de Teachable Machine
        const prediction = await model.predict(posenetOutput);

        // Encontrar la predicción con mayor probabilidad
        let maxProbability = 0;
        let predictedClass = "indeterminado";

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i];
            const probability = classPrediction.probability;
            const className = classPrediction.className;

            // Actualizar etiquetas
            const probabilityPercent = (probability * 100).toFixed(1);
            labelContainer.childNodes[i].innerHTML = `${className}: ${probabilityPercent}%`;

            // Encontrar la clase con mayor probabilidad
            if (probability > maxProbability) {
                maxProbability = probability;
                predictedClass = className;
            }
        }

        // Actualizar predicción solo si la probabilidad es mayor a 0.5
        if (maxProbability > 0.5) {
            currentPrediction = predictedClass;
            updateRobotAnimation(predictedClass);
            updateStatus(predictedClass, `Confianza: ${(maxProbability * 100).toFixed(1)}%`);
        } else {
            currentPrediction = "indeterminado";
            updateRobotAnimation("indeterminado");
            updateStatus("indeterminado", "Esperando detección...");
        }

        // Dibujar pose
        drawPose(pose);
    } catch (error) {
        console.error("Error en la predicción:", error);
    }
}

// Dibujar pose en el canvas
function drawPose(pose) {
    if (webcam.canvas && ctx) {
        ctx.drawImage(webcam.canvas, 0, 0);
        
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

// Actualizar animación del robot
function updateRobotAnimation(prediction) {
    // Remover todas las clases de animación
    leftArm.classList.remove("move", "both-arms");
    rightArm.classList.remove("move", "both-arms");

    // Aplicar animación según la predicción
    switch (prediction) {
        case "derecha":
            rightArm.classList.add("move");
            break;
        case "izquierda":
            leftArm.classList.add("move");
            break;
        case "ambos":
            leftArm.classList.add("both-arms");
            rightArm.classList.add("both-arms");
            break;
        case "indeterminado":
        default:
            // No hacer nada, el CSS maneja la posición inicial
            break;
    }
}

// Actualizar estado en la interfaz
function updateStatus(status, confidence) {
    statusDisplay.textContent = status;
    confidenceDisplay.textContent = confidence;
}

// Toggle de visibilidad de la cámara
toggleCameraBtn.addEventListener("click", () => {
    cameraWidget.classList.toggle("hidden");
    toggleCameraBtn.textContent = cameraWidget.classList.contains("hidden") ? "Mostrar" : "Ocultar";
});
