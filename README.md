<h1>DEEPSHOP</h1>

<p style="text-align: justify">Welcome to DeepShop.<br>
  
This is a project made by the students <a href="https://github.com/albertogomezz">Alberto Gomez </a> and  <a href="https://github.com/kikogilabert">Kiko Gilabert </a>  at the 2nd year of DAW  at <a href="https://portal.edu.gva.es/iestacio/">IES L'estació</a>.<br>
  
This project is about a website for the sale of second-hand products, in the style of wallapop,<br> on which different functionalities can be carried out.</p>
<hr>
  
<h2>FUNCIONALITIES</h2>
 
<p>This web contains 4 secctions in total.<p>
  
<h3>Home</h3>
<p>In the Home section, the user has his first impression of the website, where he can see 
<br>a carousel of the categories available on the page, and filter the products by them.
It also contains an infinite scroll that lists the different categories of the company.
Both options have a jump to the shop module applying the filter of the selected category.</p>
<ul>
  <li>Categories' Carrousel</li>
  <li>Categories' Infinite scroll</li>
</ul>

<h3>Search</h3>
<p>El module of search, is present both in the home and in the shop of the application. <br>
  In it, you can search for the desired product by name. This search engine redirects <br>
  to the shop section, applying the desired filter.</p>

<h3>Login</h3>
<p>The web application also consists of a login module where the user can create an account and log in with it. 
  It also has a profile section, where the user can see their products and the products they have liked. 
  It also has a settings option, where you can can modify their profile information.</p>
<ul>
  <li>Register</li>
  <li>Login</li>
  <li>Profile</li>
  <li>Settings</li>
</ul>
<p>Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay<br>
un usuario conectado.</p>
 
<h3>Shop</h3>
<p>Este es el módulo más importante de toda la web, en el se puede ver la lista de productos del que dispone la<br>
web y además se puede filtrar esta lista y la lista se encuentra paginada. También puede entrar en el<br>
producto deseado y ver una lista mas detallada de este, además, el usuario puede añadir algún comentario<br>
al producto y, en caso de que sea suyo, eliminarlo. También hay una opción de marcado de favoritos de<br> cada producto si el usuario se encuentra logeado.</p>
<ul>
  <li>Lista de productos</li>
  <li>Filtros</li>
  <li>Detalles del producto</li>
  <li>Likes</li>
  <li>Paginación</li>
  <li>Comentarios</li>
</ul>

<hr>

<h2>PUESTA EN MARCHA</h2>

<p>Es necesario crear el fichero .env en la carpeta de servidor.</p>
<p>Tener instalado las siguientes herramientas:<br>

- NodeJS V16.17.0<br>
- Angular V13<br>
- MongoDB</p>

<h3>BACKEND</h3>
<ol>
  <li>cd server</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>

<h3>FRONTEND</h3>
<ol>
  <li>cd client</li>
  <li>npm install</li>
  <li>npm start</li>
</ol>


<hr>

<h2>LIBRERÍAS</h2>

<p>Lista de librerías utilizadas en este proyecto:</p>

<ul>
  <li><a href="https://codeseven.github.io/toastr/">Toastr</a></li>
  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
  <li><a href="https://www.flaticon.es/">Flaticon</a></li>
  <li><a href="https://avatars.dicebear.com/">DiceBear Avatars</a></li>
</ul>
 
