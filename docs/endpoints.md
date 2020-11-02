|Método|Endpoint|Body|
|---|---|---|
|GET|/users/:id|N/A|
|POST|/users|{ email, firstName, lastName, document, role }|
|PUT|/users|{ id, email, firstName, lastName, document, role }|
|DELETE|/users/:id|N/A|
|GET|/sales/:id|N/A|
|GET|/sales/user/:id?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|GET|/sales/product/:id?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|GET|/sales?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|POST|/sales|{ products: [{ id, price }], userId, date, totalPrice }|
|PUT|/sales|{ id, products: [{ id, price }], userId, date, totalPrice }|
|DELETE|/sales/:id|N/A|
|GET|/products/:id|N/A|
|POST|/products|{ name, description, price }|
|PUT|/products|{ id, name, description, price }|
|DELETE|/products/:id|N/A|
|GET|/sales/user/:id/comissions?from_date="2020-09-09"&to_date="2020-09-09"|N/A|

** NOTA: Todos los endpoints esperarán por el Authorization Header el JWT correspondiente