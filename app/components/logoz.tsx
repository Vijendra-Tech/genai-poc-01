/** 
 * Create a component called RoboImage where you will use the Lucide library to display the robot icon.
 * and I wan to dispplay in 3D using the react-three-fiber library
 */
// import React from 'react'
// import { Robot } from 'lucide-react'
// import { Canvas } from 'react-three-fiber'
// import { OrbitControls } from 'drei'
// import { Box } from 'drei'
// import { Html } from 'drei'
// import { useLoader } from 'react-three-fiber'
// import { TextureLoader } from 'three'
// import robotTexture from '../assets/robot.jpg'


// function RoboImage() {
//   const texture = useLoader(TextureLoader, robotTexture)
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <OrbitControls />
//       <Box args={[3, 3, 3]}>
//         <meshBasicMaterial attach="material" map={texture} />
//       </Box>
//       <Html>
//         <div style={{ color: 'white', fontSize: '3rem' }}>
//           <Robot />
//         </div>
//       </Html>
//     </Canvas>
//   )
// }