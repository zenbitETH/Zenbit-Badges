# 🎖️ Zenbit Badges

Zenbit Badges (ZB) es una dapp de identidad onchain que automatiza la emisión de attestation con contrato EASOnboarding y una cuenta dedicada (ej. badges.zenbit.eth).

## Contenido
1. [📝 Descripción](#1-📝-descripción)
2. [👤 Roles de Usuario](#2-👤-roles-de-usuario)
3. [⚙️ ZB Tech Stack](#3-⚙️-zb-tech-stack)
4. [🌐 Marco de Habilidades Web3](#4-🌐-marco-de-habilidades-web3)
5. [🪺 Programa Piloto de Incubación de DAO](#5-🪺-programa-piloto-de-incubación-de-dao)
6. [🏁 Puesta en marcha](#🏁-puesta-en-marcha)
6. [📜 Licencia](#📜-licencia)
7. [📬 Contacto](#📬-contacto)


## 1 📝 Descripción
🧪 ZB facilita el uso de Ethereum Attestation Service (EAS) para certificar onchain el cumplimiento de actividades o el uso de herramientas web3 durante eventos presenciales o virtuales. Zenbit Badges consta de un contrato escrito en solidity que permite llevar el registro de eventos asi como de [🍎 Mentores](#🍎-mentores) y [🎒 Participantes](#🎒-participantes), además de emitir atestaciones en nombre de badges.zenbit.eth de manera automatizada.

![¿Qué es Zenbit Badges?](https://github.com/zenbitETH/Public-Assets/blob/main/Zenbit%20Badges/ZB1.png?raw=true)

ZB cuenta con 4 páginas de interacción que se mostrarán en pantalla dependiendo del rol asignado a la dirección conectada a la aplicación:
1. Eventos (visible para todos)
2. Detalle de eventos (visible para todos)
3. Perfil (visible para direcciones conectadas de participantes)
4. Crear Evento (visible solo para mentores)
5. Crear Quiz (visible solo para mentores)

![Pantalla principal de Zenbit Badges](https://github.com/zenbitETH/Public-Assets/blob/main/Zenbit%20Badges/zb4.png?raw=true)

## 2 👤 Roles de usuario
Zenbit Badges tiene 2 tiempos de usuario: mentores y participantes

### 🍎 Mentores
Los mentores pueden programar eventos educativos para desarrollar habilidades digitales de los participantes y emitir alguna de las [✅ Certificaciones Disponibles](#✅-certificaciones-disponibles) que verifiquen la comprensión del contenido impartida en el evento. Una vez creado el evento, el mentor puede agregar uno de los [❓ Tipos de Cuestionario Disponibles](#❓-tipos-de-cuestionarios-disponibles) para verificar el cumplimiento de una actividad o comprensión de un concepto clave.

### 🎒 Participantes
Los participantes son convocados a eventos presenciales o virtuales para desarrollar conocimientos o habilidades relacionadas con ethereum y web3 a través de mentorias impartidas por talento especializado en talleres o cursos educativos. Al finalizar la mentoria los participantes pueden obtener la certificación correspondiente al evento tras contestar el cuestionario y verificar sus respuestas. Los participantes podrán ver las Badges que han obtenido en su página de perfil y serán resaltadas en la pantalla inicial.

## 3 ⚙️ ZB Tech Stack
![Tecnologías en Zenbit Badges](https://github.com/zenbitETH/Public-Assets/blob/main/Zenbit%20Badges/ZB2.png?raw=true)

### dApp
- [Scaffold ETH 2](https://scaffoldeth.io/)
- [MongoDB](https://www.mongodb.com/)

### Contratos
- Mayo 2024: [EAS Onboarding en OP Mainnet](https://optimistic.etherscan.io/address/0xe383f2b3ff9024baa09b33923b8dbd0f2af98ad0#code)

### ✅ Certificaciones Disponibles

1. Introducción a Optimism (Optimism Onboarding): [EAS Schema #423](https://optimism.easscan.org/schema/view/0xe3990a5b917495816f40d1c85a5e0ec5ad3dd66e40b129edb0f0b3a381790b7b)
2. Formación de DAO (DAO Formation): [EAS Schema #424](https://optimism.easscan.org/schema/view/0xddc12d29e4863e857d1b6429f2afd4bf3d687110bbb425e730b87d5f1efcda5a)
3. Incubación de proyectos:  [EAS Schema #512](https://optimism.easscan.org/schema/view/0x17ceae0972a7b2a858182fa4fc4f63b020941f4386872a2d3b611f882bcdf9bf)
4. Taller o curso educativo: [EAS Schema #513](https://optimism.easscan.org/schema/view/0xd1b32a04207069d491b31239467ef1c57d54f3a961cbd0462a3afc52e3ec6f1a)

### ❓ Tipos de Cuestionarios Disponibles
1. Preguntas con opción multiple (3 respuestas)
2. Verificación de pertenencia a safe multisig con ENS
3. Verificación de autor con URL de de artículos de Mirror
4. Palabra secreta o cuestionario escrito

## 4 🌐 Marco de Habilidades Web3
![Marco de Habilidades Web3](https://github.com/zenbitETH/Public-Assets/blob/main/Zenbit%20Badges/Zb-3.png?raw=true)

## 5 🪺 Programa Piloto de Incubación de DAO
Desde Mayo de 2024 iniciamos un programa piloto de Incubación de DAOs para proyectos universitarios de investigación científica y/o desarrollo tecnológico. Este primer ejercicio se lleva a cabo en colaboración con el proyecto Axolotarium de la Universidad de Arkansas State Campus Querétaro, mediante sesiones semanales en las que los miembros de Axolotarium desarrollan habilidades Web3 para dar conocer su iniciativa y habilitar canales de fondeo descentralizado. 

El programa se distribuye en 8 metas en las que los participantes deben cumplir con tareas que aportan al desarrollo de su proyecto en las aréas operativas, de investigación y de tecnología. Tras finalizar las tareas de cada meta, se verifica el cumplimiento mediante el contrato onchain y se les otorga una Zenbit Badge a los participantes que verifiquen el resultado satisfactoriamente.

Zenbit Badges del programa piloto de Incubación de DAOs:
- 🎖️ZB1 / Introducción a Web3
- 🎖️ZB2 / Formación de DAO
- 🎖️ZB3 / Incubación de DAO: Presentación
- 🎖️ZB4 / Meta Operativa
- 🎖️ZB5 / Construcción de Comunidad
- 🎖️ZB6 / Fondeo Descentralizado 
- 🎖️ZB7 / Paper Académico
- 🎖️ZB8 / Desarrollo Tecnológico

### Progreso Axolotarium DAO

Badges obtenidas por Axolotarium DAO
- 🎖️ZB1 / [Introducción a Web3 - Mayo 2024](https://badges.zenbit.mx/event/1)
- 🎖️ZB2 / [Formación de DAO - Mayo 2024](https://badges.zenbit.mx/event/2) → [Axolotarium DAO multisig](https://debank.com/profile/0xd5ddce3b0dde6dc08552c914d893b409284fea0a) → [axolotarium.eth](https://app.ens.domains/axolotarium.eth)
- 🎖️ZB3 / [Incubación de DAO: Presentación - Agosto 2024](https://badges.zenbit.mx/event/6) → [Mirror Español](https://mirror.xyz/info.axolotarium.eth/_faN9bqPcOZAIOExFnxJQpiqgb948cF4LElz-jk0aw0) → [Mirror Inglés](https://mirror.xyz/info.axolotarium.eth/BxcSy3Bwcu7H8L6TMhHtGSCHHlBC9MLnmHcjlhNa3ZU)

## 6 🏁 Puesta en marcha 
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

## 7 📜 Licencia
[MIT License](https://github.com/zenbitETH/Zenbit-Badges/blob/main/LICENCE)


## 8 📬 Contacto
- [hola@zenbit.mx](mailto:hola@zenbit.mx)
- [Discord](https://discord.gg/CqD6hWudjz)
- [X](https://x.com/zenbitMX)
- [Farcaster](https://warpcast.com/zenbit)