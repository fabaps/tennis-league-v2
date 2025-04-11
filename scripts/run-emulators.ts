import { execSync } from 'child_process';
import * as os from 'os'; // Para detectar el sistema operativo

// --- Configuración ---
const FIRESTORE_PORT: number = 8080; // Puerto principal que quieres limpiar (ajusta según tu necesidad)
const EMULATOR_PORTS: number[] = [
    FIRESTORE_PORT, // Firestore
    9099, // Auth
    5001, // Functions
    5000, // Hosting
    4000, // Emulator UI
    // Agrega otros puertos si los usas
];
const DATA_DIR: string = 'firebase-data'; // Directorio para persistencia

// --- Funciones Auxiliares ---

/**
 * Intenta encontrar y matar procesos escuchando en un puerto específico.
 * Adaptado para Windows, Linux y macOS.
 * @param port El número de puerto a liberar.
 */
function killProcessOnPort(port: number): void {
    const platform = os.platform();
    let pidCommand: string;
    let killCommandExecutor: (pid: string) => void;

    console.log(`\n🧹 Verificando puerto ${port} en ${platform}...`);

    try {
        // Define comandos según el OS
        if (platform === 'win32') {
            // Windows: Usar netstat para encontrar el PID y taskkill para matar
            pidCommand = `netstat -ano | findstr LISTENING | findstr :${port}`;
            killCommandExecutor = (pid: string) => {
                console.log(`   -> Matando PID ${pid} en Windows...`);
                execSync(`taskkill /F /PID ${pid}`);
            };
        } else if (platform === 'linux' || platform === 'darwin') {
            // Linux/macOS: Usar lsof para encontrar el PID y kill -9 para matar
            // -t: solo PIDs, -i: network files, :${port}: filtro por puerto
            pidCommand = `lsof -t -i:${port} -sTCP:LISTEN`;
            killCommandExecutor = (pid: string) => {
                console.log(`   -> Matando PID ${pid} en ${platform}...`);
                execSync(`kill -9 ${pid}`);
            };
        } else {
            console.warn(`⚠️ Plataforma no soportada (${platform}). No se puede limpiar el puerto ${port} automáticamente.`);
            return;
        }

        // --- Encontrar PIDs ---
        let pids: string[] = [];
        try {
            const output = execSync(pidCommand).toString().trim();

            if (!output) {
                console.log(`✅ Puerto ${port} está libre (comando no devolvió PIDs).`);
                return; // No hay procesos escuchando
            }

            // Parsear la salida para obtener PIDs únicos
            const pidSet = new Set<string>();
            if (platform === 'win32') {
                // Netstat: El PID es la última columna
                output.split('\n').forEach(line => {
                    const parts = line.trim().split(/\s+/);
                    const pid = parts[parts.length - 1];
                    if (pid && /^\d+$/.test(pid)) {
                        pidSet.add(pid);
                    }
                });
            } else {
                // lsof -t: Devuelve un PID por línea
                output.split('\n').forEach(pid => {
                    if (pid && /^\d+$/.test(pid.trim())) {
                        pidSet.add(pid.trim());
                    }
                });
            }
            pids = Array.from(pidSet);

            if (pids.length === 0) {
                console.log(`✅ Puerto ${port} está libre (no se encontraron PIDs relevantes).`);
                return;
            }

        } catch (error: unknown) {
            // Es común que el comando falle si no encuentra nada (findstr/lsof)
            console.log(`✅ Puerto ${port} está libre (comando falló, probablemente no encontró procesos).`, error);
            // console.debug(`   (Error al buscar PID: ${error instanceof Error ? error.message : String(error)})`); // Descomentar para depuración
            return;
        }

        // --- Matar Procesos ---
        console.log(`🔪 Procesos encontrados en puerto ${port}: ${pids.join(', ')}. Intentando detener...`);
        let killedCount = 0;
        pids.forEach(pid => {
            try {
                killCommandExecutor(pid);
                console.log(`✔️ PID ${pid} detenido.`);
                killedCount++;
            } catch (killError: unknown) {
                // Puede fallar si el proceso ya murió o por permisos
                if (killError instanceof Error && (killError.message.includes('process does not exist') || killError.message.includes('not found') || killError.message.includes('No such process'))) {
                     console.log(`ℹ️ PID ${pid} ya no existía.`);
                } else {
                     console.warn(`⚠️ No se pudo detener PID ${pid}: ${killError instanceof Error ? killError.message : String(killError)}`);
                }
            }
        });
        if (killedCount > 0) {
             console.log(`👍 ${killedCount} proceso(s) detenido(s) en puerto ${port}.`);
        }


    } catch (outerError: unknown) {
        // Error si el comando principal (netstat, lsof, taskkill, kill) no existe
        console.error(`❌ Error crítico ejecutando comandos para puerto ${port}: ${outerError instanceof Error ? outerError.message : String(outerError)}`);
        console.error("   Asegúrate que las herramientas necesarias estén instaladas y en el PATH.");
    }
}

/**
 * Inicia los emuladores de Firebase asegurando la persistencia de datos.
 */
function startFirebaseEmulators(): void {
    console.log(`\n🚀 Iniciando Emuladores de Firebase...`);
    console.log(`   📂 Usando directorio de datos: ./${DATA_DIR}`);

    const command = `firebase emulators:start --import=./${DATA_DIR}`;

    console.log(`   Ejecutando: ${command}`);

    try {
        // execSync bloqueará hasta que los emuladores se detengan (o falle)
        // stdio: 'inherit' muestra la salida de los emuladores en esta consola
        execSync(command, { stdio: 'inherit' });
    } catch (error: unknown) {
        // Es normal que execSync lance un error cuando detienes los emuladores (Ctrl+C)
        // porque el proceso termina con una señal (no con código 0).
        // Podemos asumir que fue una detención normal a menos que veamos errores específicos.
        console.log("\nℹ️ Emuladores de Firebase detenidos.", error);
        // Podrías añadir lógica para verificar si hubo un error real en la salida (error.stderr)
        // pero usualmente este log es suficiente.
    }
}

// --- Ejecución Principal ---
async function run() {
    console.log("--- Iniciando Script de Emuladores Firebase ---");
    const startTime = Date.now();

    // 1. Limpiar puertos necesarios
    console.log("\n--- Paso 1: Limpiando Puertos ---");
    EMULATOR_PORTS.forEach(port => {
        killProcessOnPort(port);
    });

    // 2. Iniciar emuladores con persistencia
    console.log("\n--- Paso 2: Iniciando Emuladores ---");
    startFirebaseEmulators();

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`\n--- Script Finalizado (Duración: ${duration}s) ---`);
}

// Ejecutar la función principal y capturar errores inesperados
run().catch(error => {
    console.error("\n❌ Error inesperado en la ejecución principal:", error);
    process.exit(1); // Salir con código de error
});