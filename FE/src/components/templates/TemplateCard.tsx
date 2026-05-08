// src/components/templates/TemplateCard.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Template } from '@/types/template.types';
import { Download, Eye, Heart } from 'lucide-react';
import Image from 'next/image';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-lg">
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {template.thumbnail_url ? (
          <Image
            src={template.thumbnail_url}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Preview
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 text-slate-900 hover:bg-white">
            {template.category_name || 'Uncategorized'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {template.title}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[40px] text-sm text-slate-500">
          {template.description}
        </p>
        {/* Tambahan Info Author */}
        <p className="mt-3 text-xs font-medium text-slate-400">
          By @{template.author}
        </p>
      </CardContent>

      <CardFooter className="mt-2 flex items-center justify-between border-t border-slate-50 p-4 pt-0">
        <div className="flex items-center space-x-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" /> {template.download_count}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-red-400" />{' '}
            {template.popularity_score} {/* Pakai data asli! */}
          </span>
        </div>
        <Button size="sm" variant="outline" className="h-8">
          <Eye className="mr-1 h-4 w-4" /> View
        </Button>
      </CardFooter>
    </Card>
  );
}
