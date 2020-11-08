## sales-gateway
Este microservicio será el punto de entrada para todos los requests que lleguen a nuestro sistema. Se encargará de autenticar a los usuarios y validar que quienes estén solicitando acceso a un recurso tengan el permiso correcto así como también redireccionará los requests a los microservicios correspondientes.

<br />

## users-manager
Contendrá la información relacionada a los usuarios así como también la administración de los mismos. Será el microservicio encargado de loguear a los usuarios en el sistema.

<br />

## sales-manager
Contendrá la información relacionada a las ventas incluyendo su listado, edición, agregación y eliminación. Tendrá la responsabilidad de calcular las comisiones de los vendedores.

<br />

## products-manager
Contendrá la información relacionada a los productos y su gestión.
