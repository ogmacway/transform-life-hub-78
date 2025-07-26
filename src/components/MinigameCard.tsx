import { Button } from "@/components/ui/button";

interface MinigameCardProps {
  title: string;
  image: string;
}

const MinigameCard = ({ title, image }: MinigameCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden max-w-xs">
      <div className="aspect-square overflow-hidden p-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="p-6 pt-2">
        <h3 className="font-bold text-lg mb-4 text-center text-foreground">{title}</h3>
        <Button 
          disabled
          className="w-full bg-gray-light text-gray-600 cursor-not-allowed"
        >
          Em breve...
        </Button>
      </div>
    </div>
  );
};

export default MinigameCard;