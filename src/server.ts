import fastify from 'fastify'   // Import do framework para criar a API
import cors from '@fastify/cors'

// Cria o servidor com o logger habilitado
const server = fastify({ logger: true })

// Configurando o Cors
server.register(cors,{
    origin: "*"   // Indicando que qualquer um vai poder consumir minha API
}) 

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
    { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
    { id: 7, name: "Williams", base: "Grove, United Kingdom" },
    { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
    { id: 9, name: "Haas", base: "Kannapolis, United States" },
    { id: 10, name: "Alfa Romeo", base: "Hinwil, Switzerland" }
];

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 3, name: "Lando Norris", team: "McLaren" },
]

// Passando meu método http, passando uma rota e criando o controller
server.get("/teams", async (resquest, response) => {
    response.type("application/json").code(200)
    return { teams }
})

server.get("/drivers", async (resquest, response) => {
    response.type("application/json").code(200)
    return { drivers }
})

interface DriverParams {
    id: string
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id)  // Converte para Número
    const driver = drivers.find((d) => d.id === id)  // Find procura algo num vetor

    if (!driver) {    // Se não tiver nenhum driver retorne o status code 404
        response.type("application/json").code(404)
        return { message: "Driver Not Found" }
    } else {
        response.type("application/json").code(200)
        return { driver }
    }
})


// Fazendo o servidor escutar uma porta para o cliente poder se comunicar com ele
server.listen({ port: 3333 }, () => {
    console.log("Server init")
})