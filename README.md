# 🎖️ Zenbit Badges


🧪 Una dapp que facilita el uso de Ethereum Attestation Service (EAS) para certificar onchain el cumplimiento de actividades o el uso de herramientas web3 durante eventos presenciales o virtuales. Zenbit Badges consta de un contrato escrito en solidity que permite llevar el registro de eventos asi como de mentores y participantes, además de emitir atestaciones en nombre de badges.zenbit.eth de manera automatizada.

## Flujo de usuario
Zenbit Badges tiene 2 tiempos de usuario: mentores y participantes

### 🍎 Mentores
Los mentores pueden programar eventos educativos para desarrollar habilidades digitales de los participantes y emitir alguna de las Certificaciones Disponibles que verifiquen la comprensión del contenido impartida en el evento. Una vez creado el evento, el mentor puede agregar uno de los tipos de cuestionario disponibles para verificar el cumplimiento de una actividad o comprensión de un concepto clave.

### 🎒 Participantes
Los participantes son convocados a eventos presenciales o virtuales para desarrollar conocimientos o habilidades relacionadas con ethereum y web3 a través de mentorias impartidas por talento especializado en talleres o cursos educativos. Al finalizar la mentoria los participantes pueden obtener la certificación correspondiente al evento tras contestar el cuestionario y verificar sus respuestas. 

## ⚙️ Contratos
Mayo 2024: [EAS Onboarding en OP Mainnet](https://optimistic.etherscan.io/address/0xe383f2b3ff9024baa09b33923b8dbd0f2af98ad0#code)

## ✅ Certificaciones Disponibles

1. Introducción a Optimism (Optimism Onboarding): [EAS Schema #423](https://optimism.easscan.org/schema/view/0xe3990a5b917495816f40d1c85a5e0ec5ad3dd66e40b129edb0f0b3a381790b7b)
2. Formación de DAO (DAO Formation): [EAS Schema #424](https://optimism.easscan.org/schema/view/0xddc12d29e4863e857d1b6429f2afd4bf3d687110bbb425e730b87d5f1efcda5a)

## ⏳ Certificaciones pendientes
3. Incubación de proyectos
4. Taller o curso educativo

## ❓ Cuestionarios disponibles
1. Pregunta con opción multiple (3 respuestas)
2. Verificación de multisig  ENS

## ⚙️ Puesta en marcha
1. clonar repositorio `git clone https://github.com/zenbitETH/Zenbit-Badges.git`
2. configurar red baseSepolia (o red deseada) en [hardhat/hardhat.config.ts](https://github.com/zenbitETH/Zenbit-Badges/blob/69f6ffd5bad4c1674947b45a8f09e28977f6dd86/packages/hardhat/hardhat.config.ts#L33) y [nextjs/scaffold.config.ts](https://github.com/zenbitETH/Zenbit-Badges/blob/69f6ffd5bad4c1674947b45a8f09e28977f6dd86/packages/nextjs/scaffold.config.ts#L14) 
3. ejecutar `yarn chain` (esto corre el nodo de hardhat) y dejar la terminal corriendo 
4. ejecutar `yarn deploy` en una nueva terminal (esto deploya el contrato en hardhat, que apunta a baseSepolia)
5. ejecutar `yarn start` (esto corre el frontend, con la direccion del contrato actualizada automaticamente por scaffold-eth2)
6. crear una base de datos en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
7. configurar las variables de entorno necesarias (importantes: private key de la wallet + url de base de datos)
8. configurar wallet con rol "Mentor" en el contrato, desde baseSepolia SCAN (o de la red deseada)
9. crear evento
10. crear quiz
11. atestar