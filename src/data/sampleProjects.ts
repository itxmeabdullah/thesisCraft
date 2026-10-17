import { SampleProject } from '../types';

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'edge-vision',
    name: 'EdgeVision-Grid',
    badge: 'Edge AI / Vision',
    title: 'EdgeVision-Grid: Autonomous Real-Time Thermal & Visual Anomaly Detection for High-Voltage Transmission Lines',
    domain: 'Artificial Intelligence & Machine Learning',
    degreeLevel: 'BS Computer Science (Final Year Project)',
    techStack: ['PyTorch', 'TensorRT', 'YOLOv10', 'NVIDIA Jetson', 'FastAPI', 'PostgreSQL', 'Docker', 'WebSockets'],
    documentMode: 'proposal',
    rubricPreset: 'hec-obe',
    description: 'Edge-computed UAV vision pipeline detecting insulator flashovers and phase overheating under 45ms latency with sub-5W power envelope.',
  },
  {
    id: 'medchain',
    name: 'MedChain-Federated',
    badge: 'Security & Health',
    title: 'MedChain-Federated: Privacy-Preserving Multi-Hospital EHR Analytics via Differential Privacy & Hyperledger Fabric',
    domain: 'Healthcare & Biomedical Informatics',
    degreeLevel: 'BS Software Engineering (Capstone Project)',
    techStack: ['Hyperledger Fabric', 'Go', 'Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    documentMode: 'srs',
    rubricPreset: 'ieee-strict',
    description: 'Decentralized electronic health records exchange enabling cross-institutional federated learning without raw patient record exposure.',
  },
  {
    id: 'kubellm',
    name: 'KubeLLM-Mesh',
    badge: 'Distributed Systems',
    title: 'KubeLLM-Mesh: Dynamic KV-Cache Swapping & Token-Slicing Scheduler for Heterogeneous GPU Clusters',
    domain: 'Cloud & Distributed Systems',
    degreeLevel: 'MS Computer Science / Thesis',
    techStack: ['Kubernetes', 'Go', 'Rust', 'vLLM', 'Redis', 'gRPC', 'Prometheus', 'Grafana'],
    documentMode: 'sds',
    rubricPreset: 'novelty-research',
    description: 'Distributed orchestration layer reducing TTFT (Time To First Token) by 38% across mixed RTX and A100 GPU nodes.',
  },
  {
    id: 'iot-traffic',
    name: 'PulseFlow-Traffic',
    badge: 'IoT & Smart City',
    title: 'PulseFlow: Adaptive Micro-Traffic Signal Actuation Using Graph Neural Networks and Edge V2X Telemetry',
    domain: 'Internet of Things & Embedded Edge',
    degreeLevel: 'BS Computer Science (Final Year Project)',
    techStack: ['Python', 'SUMO Simulator', 'PyTorch Geometric', 'MQTT', 'TimescaleDB', 'React', 'MapLibre GL'],
    documentMode: 'proposal',
    rubricPreset: 'hec-obe',
    description: 'Real-time urban intersection optimization minimizing commuter queue lengths and carbon emissions via federated GNN agents.',
  }
];

export const POPULAR_TECH_TAGS = [
  'PyTorch', 'TensorFlow', 'FastAPI', 'Express', 'React', 'TypeScript',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'Kafka',
  'GraphQL', 'gRPC', 'WebSockets', 'TailwindCSS', 'Next.js', 'Rust',
  'Go', 'Flutter', 'ROS2', 'OpenCV', 'LangChain', 'vLLM'
];
