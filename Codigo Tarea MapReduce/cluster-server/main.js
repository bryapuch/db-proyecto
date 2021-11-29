
const fs = require('fs');
const uuid = require('uuid');
const cors = require('cors');
const express = require('express');
const socket_io = require('socket.io');
const { spawn } = require('child_process')

const app = express();

app.use(cors());

/**
 * Funcion que ejecuta la tarea map reduce
 * @param {*} palabra Palabra que se buscara en el título de cada articulo
 * @returns Promesa con la respuesta del documento de palabras
 */
const executeTask = function(palabra) {
    
    return ( new Promise((res, rej) => {
    
        let results = "";
        
        // Identificador único para los archivos
        const file_uuid = uuid.v4().concat('.txt');
        
        // Archivo de palabras resultado de ejecutar el comando hdfs
        let file = fs.createWriteStream(file_uuid, { flags: 'a' });

        // Creación del proceso que ejecuta el job
        const job = spawn('./hadoop_job.sh', [file_uuid]);
        console.log("Se ha iniciado una nueva tarea MapReduce\n");
        console.log("Ejecutando Job...\n");

        // Manejador de evento exit para el proceso que ejecuta el job
        job.on('exit', function (data) {

            console.log("Job terminado\n");

            // Creación del proceso que ejecuta el comando hdfs
            const hdfs = spawn('./hdfs_routine.sh', [file_uuid]);

            // Manejador de evento data para capturar la salida por pantalla del comando hdfs
            hdfs.stdout.on('data', function(data) { results += `${data}`; });

            // Manejador del evento exit para el proceso del comando hdfs
            hdfs.on('exit', function(code) {

                file.write(results); // Se escribe el resultado del comando hdfs en el archivo
                file.close();
                console.log("La tarea MapReduce se ejecuto exitosamente");
    	
                // Ejecución del proceso grep para filtrar las palabras
                let grepResults = "";
    	        const grep = spawn('./grep_routine.sh', [file_uuid, palabra]);
                console.log("Iniciando la tarea Grep...\n");
    	        grep.stdout.on('data', function(data) { grepResults += `${data}`; });
    	        grep.on('exit', function(code) { 
                
                    res(grepResults);
                    console.log("La tarea Grep ha finalizado\n");
                
                });
 
            });

        });
    
    }));

}

const server = app.listen(8080, function() { console.log("Servidor iniciado en el puerto 8080\n") });

// Inicialización del servidor de sockets
const io = socket_io(server, {

    cors: {
        origin: '*',
    }

});

// Manejador para las conexiones al servidor de sockets
io.on('connection', async function (socket) {
  
  console.log("Conexión establecida\n");

  // Manejador para el evento que inicia una nueva tarea MapReduce
  socket.on("new mapreduce", async function (data) {
    
    let [taskId, word]  = data; // Se obtiene el id único de la tarea
    
    // Se ejecuta la tarea MapReduce
    executeTask(word).then( 
	(response) => io.emit(`finished task ${taskId}`, response) );
    // Se envia los datos mediante la conexión de sockets al resolverse la promesa

  });

});

