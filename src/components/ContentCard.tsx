import { Button } from "@/components/ui/button";

interface ContentCardProps {
  title: string;
  description: string;
  image: string;
  onOpen: () => void;
}

const ContentCard = ({ title, description, image, onOpen }: ContentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden max-w-sm">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{description}</p>
        <Button 
          onClick={onOpen}
          className="w-full bg-green-light hover:bg-green-light/90 text-white font-medium"
        >
          Abrir
        </Button>
      </div>
    </div>
  );
};

export default ContentCard;