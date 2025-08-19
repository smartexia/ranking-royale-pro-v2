import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  Eye, 
  Edit3, 
  Trash2, 
  Download, 
  RefreshCw, 
  Zap, 
  Camera, 
  FileImage, 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  Clock
} from 'lucide-react';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  ocrResults?: TeamResult[];
  gameNumber?: number;
}

interface TeamResult {
  id: string;
  teamName: string;
  placement: number;
  kills: number;
  points: number;
  confidence: number;
  isEdited: boolean;
}

const UploadResults = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [editingResult, setEditingResult] = useState<TeamResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Simulated OCR processing
  const simulateOCR = useCallback((imageId: string) => {
    const mockResults: TeamResult[] = [
      { id: '1', teamName: 'Thunder Wolves', placement: 1, kills: 8, points: 15, confidence: 0.95, isEdited: false },
      { id: '2', teamName: 'Cyber Eagles', placement: 2, kills: 6, points: 12, confidence: 0.92, isEdited: false },
      { id: '3', teamName: 'Neon Hunters', placement: 3, kills: 5, points: 10, confidence: 0.88, isEdited: false },
      { id: '4', teamName: 'Storm Riders', placement: 4, kills: 4, points: 8, confidence: 0.85, isEdited: false },
      { id: '5', teamName: 'Shadow Force', placement: 5, kills: 3, points: 6, confidence: 0.90, isEdited: false },
      { id: '6', teamName: 'Fire Phoenix', placement: 6, kills: 2, points: 4, confidence: 0.82, isEdited: false },
      { id: '7', teamName: 'Ice Wolves', placement: 7, kills: 1, points: 2, confidence: 0.78, isEdited: false },
      { id: '8', teamName: 'Dark Knights', placement: 8, kills: 0, points: 1, confidence: 0.75, isEdited: false }
    ];

    // Simulate processing time
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setUploadedImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, status: 'completed', progress: 100, ocrResults: mockResults }
            : img
        ));
      } else {
        setUploadedImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, progress }
            : img
        ));
      }
    }, 200);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      
      const newImage: UploadedImage = {
        id,
        file,
        preview,
        status: 'processing',
        progress: 0,
        gameNumber: uploadedImages.length + 1
      };
      
      setUploadedImages(prev => [...prev, newImage]);
      
      // Start OCR simulation
      setTimeout(() => simulateOCR(id), 500);
    });
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      // Revoke object URL to prevent memory leaks
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return updated;
    });
    
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const reprocessImage = (id: string) => {
    setUploadedImages(prev => prev.map(img => 
      img.id === id 
        ? { ...img, status: 'processing', progress: 0, ocrResults: undefined }
        : img
    ));
    
    setTimeout(() => simulateOCR(id), 500);
  };

  const updateResult = (imageId: string, resultId: string, field: keyof TeamResult, value: any) => {
    setUploadedImages(prev => prev.map(img => 
      img.id === imageId 
        ? {
            ...img,
            ocrResults: img.ocrResults?.map(result => 
              result.id === resultId 
                ? { ...result, [field]: value, isEdited: true }
                : result
            )
          }
        : img
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Upload className="w-4 h-4 text-blue-400" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const exportResults = () => {
    const allResults = uploadedImages
      .filter(img => img.ocrResults)
      .flatMap(img => img.ocrResults!.map(result => ({
        ...result,
        gameNumber: img.gameNumber
      })));
    
    console.log('Exportando resultados:', allResults);
    // TODO: Implementar exportação
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Upload de Resultados
            </h1>
            <p className="text-gray-400 mt-2">Faça upload das screenshots e processe os resultados automaticamente</p>
          </div>
        </div>
        
        {uploadedImages.some(img => img.ocrResults) && (
          <Button 
            onClick={exportResults}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Resultados
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drag & Drop Zone */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-400" />
                Upload de Screenshots
              </CardTitle>
              <CardDescription className="text-gray-400">
                Arraste e solte as imagens ou clique para selecionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                  ${isDragOver 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                    <FileImage className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <p className="text-lg font-semibold text-white mb-2">
                      Arraste suas screenshots aqui
                    </p>
                    <p className="text-gray-400">
                      ou <span className="text-purple-400 font-semibold">clique para selecionar</span>
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Suporta: PNG, JPG, JPEG • Máximo 10MB por arquivo
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Scan className="w-5 h-5 text-blue-400" />
                  Imagens Processadas
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {uploadedImages.length} imagem(ns) • Clique para visualizar resultados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uploadedImages.map((image) => (
                    <div 
                      key={image.id}
                      className={`
                        relative group cursor-pointer rounded-lg overflow-hidden border transition-all duration-300
                        ${selectedImage?.id === image.id 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-gray-700 hover:border-gray-600'
                        }
                      `}
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="aspect-video bg-gray-800 relative">
                        <img 
                          src={image.preview} 
                          alt={`Screenshot ${image.gameNumber}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-2 left-2">
                          <Badge className={getStatusColor(image.status)}>
                            {getStatusIcon(image.status)}
                            <span className="ml-1 capitalize">
                              {image.status === 'processing' ? 'Processando' :
                               image.status === 'completed' ? 'Concluído' :
                               image.status === 'error' ? 'Erro' : 'Enviando'}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Game Number */}
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-gray-800/80 text-white">
                            Jogo {image.gameNumber}
                          </Badge>
                        </div>
                        
                        {/* Progress Bar */}
                        {image.status === 'processing' && (
                          <div className="absolute bottom-0 left-0 right-0 p-2">
                            <Progress value={image.progress} className="h-1" />
                          </div>
                        )}
                        
                        {/* Actions */}
                        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.status === 'completed' && (
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                reprocessImage(image.id);
                              }}
                              className="bg-gray-800/80 hover:bg-gray-700/80"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(image.id);
                            }}
                            className="bg-red-500/80 hover:bg-red-600/80"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {selectedImage ? (
            <>
              {/* Image Preview */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    Jogo {selectedImage.gameNumber}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {selectedImage.file.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={selectedImage.preview} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* OCR Results */}
              {selectedImage.ocrResults && (
                <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Resultados Detectados
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Clique para editar • Confiança média: {Math.round(selectedImage.ocrResults.reduce((acc, r) => acc + r.confidence, 0) / selectedImage.ocrResults.length * 100)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {selectedImage.ocrResults.map((result) => (
                        <div 
                          key={result.id}
                          className={`
                            p-3 rounded-lg border transition-all duration-200 hover:bg-gray-800/30
                            ${result.isEdited 
                              ? 'border-blue-500/30 bg-blue-500/5' 
                              : 'border-gray-700'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-white">#{result.placement}</span>
                              <span className="text-white font-semibold">{result.teamName}</span>
                              {result.isEdited && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                                  Editado
                                </Badge>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setEditingResult(editingResult?.id === result.id ? null : result)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {editingResult?.id === result.id ? (
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label className="text-xs text-gray-400">Posição</Label>
                                <Input 
                                  type="number"
                                  value={result.placement}
                                  onChange={(e) => updateResult(selectedImage.id, result.id, 'placement', parseInt(e.target.value) || 1)}
                                  className="bg-gray-800/50 border-gray-600 text-white text-sm h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-400">Kills</Label>
                                <Input 
                                  type="number"
                                  value={result.kills}
                                  onChange={(e) => updateResult(selectedImage.id, result.id, 'kills', parseInt(e.target.value) || 0)}
                                  className="bg-gray-800/50 border-gray-600 text-white text-sm h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-400">Pontos</Label>
                                <Input 
                                  type="number"
                                  value={result.points}
                                  onChange={(e) => updateResult(selectedImage.id, result.id, 'points', parseInt(e.target.value) || 0)}
                                  className="bg-gray-800/50 border-gray-600 text-white text-sm h-8"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between text-sm">
                              <span className="text-red-400">{result.kills} kills</span>
                              <span className="text-green-400">{result.points} pts</span>
                              <span className="text-gray-400">{Math.round(result.confidence * 100)}%</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-400">
                  Selecione uma imagem para visualizar os resultados
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResults;