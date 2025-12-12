// Exportar módulos de almacenamiento
export * from './storage';

export * from './cache';

export const configureInfrastructure = (config = {}) => {
  if (config.cache) {
    const { defaultTTL = 5 * 60 * 1000 } = config.cache;
    
    // Aquí podrías configurar el servicio de caché global
    // Por ejemplo, establecer un TTL por defecto
  }
  
  // Otras configuraciones de infraestructura podrían ir aquí
  
  return {
    // Aquí podrías devolver instancias configuradas
  };
};

const defaultConfig = {
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutos
  },
};

configureInfrastructure(defaultConfig);
