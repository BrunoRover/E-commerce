import {
  FaDumbbell,
  FaHeartbeat,
  FaLeaf,
  FaBalanceScale,
  FaRunning,
  FaSeedling,
  FaBone,
  FaRedo,
  FaSmile,
} from "react-icons/fa";
export function Benefit() {
  const benefits = [
    {
      text: "Alta concentração de proteínas de alto valor biológico.",
      icon: <FaDumbbell className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Fornece nutrientes ao sistema imunológico.",
      icon: <FaHeartbeat className="text-gray-500 text-2xl" />,
    },
    {
      text: "Aumento da massa magra.",
      icon: <FaLeaf className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Pode auxiliar no emagrecimento.",
      icon: <FaBalanceScale className="text-gray-500 text-2xl" />,
    },
    {
      text: "Aumento no aporte proteico na dieta.",
      icon: <FaRunning className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Rápida reposição de aminoácidos ao tecido muscular.",
      icon: <FaSeedling className="text-gray-500 text-2xl" />,
    },
    {
      text: "Melhora a saúde óssea.",
      icon: <FaBone className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Melhora da recuperação do tecido muscular.",
      icon: <FaRedo className="text-gray-500 text-2xl" />,
    },
    {
      icon: <FaSmile className="text-indigo-500 text-2xl" />,
      text: "Contribui para a saúde geral e bem-estar.",
    },
  ];
  return (
    <div className="p-10 bg-gray-50 pl-10">
      <h1 className="text-center text-zinc-800 text-3xl font-bold mb-8">
        Benefícios dos Suplementos Proteicos
      </h1>
      <p className="text-center text-gray-600 text-lg mb-10 leading-relaxed">
        De modo geral, estes suplementos proteicos auxiliam com diferentes
        benefícios, tanto para sua saúde como para seu desempenho. São eles:
      </p>
      <div className="px-8 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 text-gray-800 text-left font-medium hover:shadow-xl transition-shadow duration-300"
            >
              {benefit.icon}
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
