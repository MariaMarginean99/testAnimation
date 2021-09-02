import React, {useEffect, useState, useRef} from "react";
import { useFrame } from "react-three-fiber";
import *  as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D";
import { AnimationClip } from "three/src/animation/AnimationClip";
import useScroll from "components/useScroll";


interface group{
    current:{
        rotation: {
            x:number;
            y: number;
            z: number;
        };
    };
}

interface actions {
    current: {
        idle:{
            play: ()=> void;
        };
    };
}

const Model = () =>{

    let scroll =useScroll();
    console.log(scroll);
    // Refs 
    const group: group = useRef();
    const actions: actions = useRef();

    // State 
    const [model, setModel]= useState<Object3D | null>(null);
    const [animation, setAnimation]= useState<AnimationClip[] | null>(null);

    // Mixer
    const[mixer] = useState(() => new THREE.AnimationMixer(null));

    // Load model 
    useEffect( () =>{
        const loader = new GLTFLoader();
        loader.load("/scene.gltf", async (gltf) => {
            const nodes = await gltf.parser.getDependencies("node");
            const animations = await gltf.parser.getDependencies("animation");
            setModel(nodes[0]);
            setAnimation(animations);
        });
    }, []);


    // Set animation

    useEffect(() => {
        if(animation && animation.length && typeof group.current != "undefined"){
            actions.current ={
                idle: mixer.clipAction(animation[0], group.current as Object3D),
            };
            actions.current.idle.play();
            return () => animation.forEach((clip) => mixer.uncacheClip(clip));
        }
    }, [animation,mixer]);
    
    // Animation update
    useFrame((_,delta) => mixer.update(delta));

    // Rotation

    useFrame(() => {
        if(typeof group.current != "undefined")
            return (group.current.rotation.y +=0.001);
    });

    return (
        <>
        {model ? ( 
            <group ref ={group} position ={[0,-10,0]} dispose ={null}>
                <primitive ref={group} name="Object_0" object ={model}/>
            </group>
        ): null}
        </>
    );
};

export default Model;