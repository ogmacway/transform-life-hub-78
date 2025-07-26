import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ContentCard from "@/components/ContentCard";
import MinigameCard from "@/components/MinigameCard";
import PDFModal from "@/components/PDFModal";

// Import images
import flappyBirdImg from "@/assets/flappy-bird.png";
import geometryDashImg from "@/assets/geometry-dash.png";
import alimentacaoImg from "@/assets/alimentacao.png";
import receitasImg from "@/assets/receitas.png";
import exerciciosImg from "@/assets/exercicios.png";
import sonoImg from "@/assets/sono.png";
import diasImg from "@/assets/30-dias-nova.png";
import assistenteAvatar from "@/assets/assistente-avatar.png";

const Index = () => {
  const [selectedPDF, setSelectedPDF] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const contentData = [
    {
      title: "Desvendando a Alimentação",
      description: "Para quem quer perder peso sem dietas restritivas, promovendo hábitos alimentares que levam a resultados duradouros.",
      image: alimentacaoImg,
      pdfUrl: "https://drive.google.com/file/d/1XImVrOVbjapNjgK3ZRpQxl6H46yjkyOp/preview"
    },
    {
      title: "Receitas Saudáveis",
      description: "Receitas para não sofrer!, e continuar comendo o que gosta.",
      image: receitasImg,
      pdfUrl: "https://drive.google.com/file/d/1hzP8izx_Ot88S59qxt7CjOyrBugv7yq-/preview"
    },
    {
      title: "Mova-se em casa",
      description: "Com treinos simples e eficazes, você consegue resultados visíveis. Transforme sua rotina e conquiste o corpo dos seus sonhos no conforto do seu lar.",
      image: exerciciosImg,
      pdfUrl: "https://drive.google.com/file/d/1bv_fmG2WXRdkuAIQfrUNwNcbXoABldgM/preview"
    },
    {
      title: "Sono de Qualidade",
      description: "O segredo para ter um bom rendimento durante o dia é ter uma boa noite de sono!",
      image: sonoImg,
      pdfUrl: "https://drive.google.com/file/d/1IvfYLXzNC89D71NqA5A_MZwDDxU8a0f_/preview"
    },
    {
      title: "30 Dias para emagrecer",
      description: "Programa que vai transformar seu corpo em apenas um mês. Alimentação balanceada e exercícios fáceis de seguir. Sem complicação!",
      image: diasImg,
      pdfUrl: "https://drive.google.com/file/d/1cdmvwKZ3RgwIL2C5LolLIbBOzvZKsJKQ/preview"
    }
  ];

  const openPDF = (title: string, url: string) => {
    setSelectedPDF({ title, url });
  };

  const closePDF = () => {
    setSelectedPDF(null);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-green text-white py-12 px-6 relative">
        <div className="absolute top-4 left-4">
          <User className="h-8 w-8" />
        </div>
        <div className="absolute top-4 right-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            TRANSFORME SUA VIDA
          </h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
      </header>

      {/* Minigames Section */}
      <section className="bg-section-bg py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white rounded-lg border border-gray-200 px-8 py-4">
              <h2 className="text-3xl font-bold text-foreground">Minigames</h2>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <MinigameCard title="Flappy Bird" image={flappyBirdImg} />
            <MinigameCard title="Geometry Dash" image={geometryDashImg} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gradient-green py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white rounded-lg border border-gray-200 px-8 py-4">
              <h2 className="text-3xl font-bold text-foreground">Conteúdos</h2>
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {contentData.map((content, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <ContentCard
                      title={content.title}
                      description={content.description}
                      image={content.image}
                      onOpen={() => openPDF(content.title, content.pdfUrl)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 lg:-left-16" />
              <CarouselNext className="-right-12 lg:-right-16" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Assistant Section */}
      <section className="bg-section-bg py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-lg border border-gray-200 px-8 py-4">
              <h2 className="text-3xl font-bold text-foreground">Jon, o assistente inteligente</h2>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={assistenteAvatar} 
                  alt="Jon - Assistente Inteligente"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg p-4">
                <p className="text-foreground">Olá! Eu sou o Jon. Como posso ajudá-lo hoje?</p>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Digite sua pergunta aqui..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
              />
              <button className="w-full bg-green-light text-white py-3 px-6 rounded-lg font-medium">
                Em breve...
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-secondary text-white py-8 px-6">
        <div className="text-center">
          <p>© 2025 Organize Sua Vida. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* PDF Modal */}
      <PDFModal
        isOpen={!!selectedPDF}
        onClose={closePDF}
        title={selectedPDF?.title || ""}
        pdfUrl={selectedPDF?.url || ""}
      />
    </div>
  );
};

export default Index;
