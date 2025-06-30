package com.total.products.Products.Config;

import com.total.products.Products.Model.Product;
import com.total.products.Products.Repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {
    @Bean
    public CommandLineRunner loadInitialProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Product prod1 = new Product();
                prod1.setName("Pantalla Smart TV TCL QLED 50 Pulgadas UHD 4K 50Q5K");
                prod1.setPrice(12500.99);
                prod1.setCategoryId(1L);
                prod1.setDescription("Es una smart TV de 50 pulgadas, con definición ultra HD 4K y 3840 x 2160 píxeles de resolución. También tiene tecnología QLED y sistema operativo Google TV, así como potencia de audio DTS.\n");
                prod1.setImageUrl("https://m.media-amazon.com/images/I/71ehzrGUO7L.jpg");

                Product prod2 = new Product();
                prod2.setName("Pantalla Smart TV Samsung LED 75 Pulgadas UHD 4K LH75BEDHVGFxZx");
                prod2.setPrice(8999.99);
                prod2.setCategoryId(1L);
                prod2.setDescription("Características especiales: Compatible con Samsung Business tv app");
                prod2.setImageUrl("https://cdn1.coppel.com/images/catalog/pm/2894193-1.jpg");

                Product prod3 = new Product();
                prod3.setName("Pantalla Smart TV Hisense LED 50 Pulgadas UHD 4K 50A6NV");
                prod3.setPrice(499.99);
                prod3.setCategoryId(1L);
                prod3.setDescription("Con 50\", el modelo 50A6NV aumenta el entretenimiento y te sumerge en una experiencia audiovisual nunca antes vista, pues cuenta con tecnología LED y calidad Ultra HD 4K.\n");
                prod3.setImageUrl("https://cdn1.coppel.com/images/catalog/pm/2513063-1.jpg");

                Product prod4 = new Product();
                prod4.setName("Asistente de Voz Amazon Echo Dot 5.a Generación con Alexa");
                prod4.setPrice(15000.00);
                prod4.setCategoryId(2L);
                prod4.setDescription("Un hogar inteligente comandado por tu voz, es posible gracias a Echo Dot 5a. Generación de Amazon, y tu asistente personal, Alexa.\n.");
                prod4.setImageUrl("https://cdn1.coppel.com/images/catalog/pm/2939963-1.jpg");

                Product prod5  = new Product();
                prod5.setName("Bocina Bluetooth JBL Flip 6 portátil resistente al agua");
                prod5.setPrice(2299.00);
                prod5.setCategoryId(2L);
                prod5.setDescription("Disfruta de un sonido potente y claro con la JBL Flip 6. Ideal para exteriores, resistente al agua y con hasta 12 horas de reproducción.");
                prod5.setImageUrl("https://cdn1.coppel.com/images/catalog/pm/2891493-1.jpg?iresize=width:255,height:205");

                Product prod6 = new Product();
                prod6.setName("Minicomponente LG XBOOM CL65 con Bluetooth y Karaoke");
                prod6.setPrice(4799.00);
                prod6.setCategoryId(2L);
                prod6.setDescription("Vive la experiencia de una fiesta en casa con el potente sonido del LG XBOOM CL65. Con conectividad Bluetooth, efectos de DJ y función karaoke.");
                prod6.setImageUrl("https://cdn1.coppel.com/images/catalog/pm/2606183-1.jpg?iresize=width:255,height:205");

                Product prod7 = new Product();
                prod7.setName("Cámara de Seguridad Wi-Fi TP-Link Tapo C200");
                prod7.setPrice(749.00);
                prod7.setCategoryId(3L);
                prod7.setDescription("Vigila tu hogar desde tu smartphone con visión nocturna, audio bidireccional y rotación de 360°.");
                prod7.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/325/3000/3251271-1.jpg?iresize=width:255,height:205");

                Product prod8 = new Product();
                prod8.setName("Kit de Videovigilancia Hikvision con 4 Cámaras y DVR");
                prod8.setPrice(3999.00);
                prod8.setCategoryId(3L);
                prod8.setDescription("Sistema completo de videovigilancia con 4 cámaras HD y grabador DVR, ideal para casas o negocios.");
                prod8.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/324/3000/3241218-1.jpg?iresize=width:255,height:205");

                Product prod9 = new Product();
                prod9.setName("Sensor de Movimiento Inteligente Xiaomi Mi");
                prod9.setPrice(299.00);
                prod9.setCategoryId(3L);
                prod9.setDescription("Sensor de movimiento compacto compatible con Mi Home, perfecto para automatizar la seguridad del hogar.");
                prod9.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/5861/3000/58611131-1.jpg?iresize=width:255,height:205");

                Product prod10 = new Product();
                prod10.setName("Cable HDMI 2.0 de Alta Velocidad 1.8 m");
                prod10.setPrice(129.00);
                prod10.setCategoryId(4L);
                prod10.setDescription("Transfiere audio y video en alta definición con este cable HDMI de 1.8 metros.");
                prod10.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/3681/3000/36811018-1.jpg?iresize=width:255,height:205");

                Product prod11 = new Product();
                prod11.setName("Base Enfriadora para Laptop con Luz LED");
                prod11.setPrice(249.00);
                prod11.setCategoryId(4L);
                prod11.setDescription("Mejora el rendimiento de tu laptop evitando el sobrecalentamiento con esta base con ventiladores silenciosos.");
                prod11.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/8966/3000/89661048-1.jpg?iresize=width:255,height:205");

                Product prod12 = new Product();
                prod12.setName("Adaptador USB-C a HDMI para Video 4K");
                prod12.setPrice(319.00);
                prod12.setCategoryId(4L);
                prod12.setDescription("Conecta dispositivos USB-C a pantallas HDMI con calidad 4K. Ideal para laptops y tablets.");
                prod12.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/202/3000/2021107-1.jpg?iresize=width:255,height:205");

                Product prod13 = new Product();
                prod13.setName("Raspberry Pi 4 Modelo B 4GB RAM");
                prod13.setPrice(1850.00);
                prod13.setCategoryId(5L);
                prod13.setDescription("Mini computadora de placa única para proyectos electrónicos, programación y domótica.");
                prod13.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/7312/3000/73121811-1.jpg?iresize=width:255,height:205");

                Product prod14 = new Product();
                prod14.setName("Sensor de Temperatura y Humedad DHT11");
                prod14.setPrice(49.00);
                prod14.setCategoryId(5L);
                prod14.setDescription("Sensor digital básico ideal para proyectos con Arduino y Raspberry Pi.");
                prod14.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/8169/3000/81691008-1.jpg?iresize=width:255,height:205");

                Product prod15 = new Product();
                prod15.setName("Arduino UNO R3 Original con Cable USB");
                prod15.setPrice(299.00);
                prod15.setCategoryId(5L);
                prod15.setDescription("Placa de desarrollo ideal para aprender electrónica y crear prototipos interactivos.");
                prod15.setImageUrl("https://cdn1.coppel.com/images/catalog/mkp/3693/3000/36931004-1.jpg?iresize=width:255,height:205");

                repository.saveAll(List.of(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15));
                System.out.println("Initial products created.");
            }
        };
    }
}
