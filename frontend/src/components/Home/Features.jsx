import React from "react";
import {
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl lg:text-5xl font-bold font-heading mb-24">
          Engage, cresça e monetize sua paixão!
        </h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-green-500 ml-4">
                  <FaDollarSign className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-green-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Possibilidade de ganhar por views
                </h2>
                <p className="text-gray-600">
                  Post mais visualizados, mais dinheiro no seu bolso. Ganhe por visualização, é só compartilhar.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4 border-l border-dashed border-gray-50 lg:border-transparent">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-red-600 ml-4">
                  <FaUsers className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-red-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Faça sua comunidade
                </h2>
                <p className="text-gray-600">
                  Engage sua audiência e aumente seu networking na sua comunidade ou em outras voltavas para seus interesses em comum.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-blue-600 ml-4">
                  <FaChartLine className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-blue-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Dashboard fácil de usar
                </h2>
                <p className="text-gray-600">
                  Sua jornada é facilidade com nossa plataforma simples e intuitiva.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-pink-500 ml-4">
                  <FaHeart className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-pink-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Conecte com seus seguidores
                </h2>
                <p className="text-gray-600">
                  Monte sua fanbase com seus seguidores e tenha autoridade no seu nicho.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-yellow-500 ml-4">
                  <FaStar className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-yellow-500 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Suba de nível
                </h2>
                <p className="text-gray-600">
                  Produtores de conteúdos mais engajados estarão no painel geral de destaques. Isso mostrará que você é um produtor de conteúdo de qualidade.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col h-full">
              <div className="pb-4">
                <div className="rounded-2xl w-14 h-14 flex items-center justify-center bg-purple-600 ml-4">
                  <FaThumbsUp className="text-white" size="24" />
                </div>
              </div>
              <div className="relative pl-4 pb-12 border-l border-dashed border-gray-50 flex-1">
                <div className="absolute top-0 -left-px bg-purple-600 w-0.5 h-6" />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  Engage e Inspire
                </h2>
                <p className="text-gray-600">
                  As comunidades são o melhor lugar para se conectar com pessoas que compartilham dos mesmos interesses. Inspire e seja inspirado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;