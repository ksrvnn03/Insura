import { 
    Pipe, 
    PipeTransform 
 } from '@angular/core';  
 
 @Pipe ({ 
    name: 'Extension' 
 }) 
 
 export class MultiplierPipe implements PipeTransform { 
    transform(value: any, multiply: any): any { 
       var fileExt = multiply.split('.').pop();
       return fileExt; 
    } 
 } 
 