# Online Grocery Store Website
This is a simulated online grocery shopping experience for a Grocery Store, applicable to any e-commerce shopping application. The website allows customers to view a hierarchy of item categories and a collection of items with images upon entering the shop. Customers can check the details of chosen products and add items to a virtual shopping cart. They can edit the quantity of items in the cart or remove items from it. The website also enables customers to proceed to checkout by filling an online order form, where they provide delivery details and email addresses. After placing the order, a confirmation email is sent to the customer's email address.

# Objective
The main objectives of this project are as follows:

1. Learn about the design of professional (advanced) web pages.
2. Understand real-life website design, including hierarchical structures for navigation.
3. Utilize graphic tools for creating clickable rollover image maps.
4. Design customized presentation (layout) of web pages.
5. Use client-side scripting languages for creating dynamic web pages.
6. Create an e-commerce application using a combination of scripting languages, descriptive languages, and development tools.

# Window Layout
The website is designed to divide the browser window into multiple frames. Below are two examples:

1. Example 1:
- Frame 1: Website logo and other elements.
- Frame 2: Category hierarchy showing top-level categories initially, and expanding to show second-level categories on mouseover or click.
2. Example 2:
- Frame 1: Category hierarchy showing top-level categories and expanding to show second-level categories on mouseover or click.
- Frame 2: Main information area displaying a collection of items with images and "Add" buttons, allowing customers to add items to the shopping cart.

# Functional Specification for Visual Components
## Website Logo:
- The website should have a logo either in a separate frame or as part of a frame that also contains other elements.
## Category Hierarchy:
- Initially, a separate frame should show only the top-level categories of items available in the shop.
- When the mouse moves over or clicks a particular category node, the node expands to show the second-level categories of items.
- Whenever a second-level category is clicked, it shows a list of items in the category in the main information area (most likely in a different frame).
## Main Information Area:
- Initially, the main information area (i.e., a separate frame) should show a collection of items. Each item has an image and an "Add" button beside it. Customers can click the button to add the item to the shopping cart only when the item is "in stock".
- When a customer clicks on a particular item, a new page (most likely in a different frame) or a pop-up window shows more details about that item, where the customer can still add the item to the shopping cart.
## Search Box:
- There should be a search box (either in the main information area or a separate frame) that customers can use to look for items by name or filter items by price (or price range).
- The search results will show in the main information area.
## Shopping Cart:
- There should be a separate frame or pop-up window showing the content of a virtual shopping cart. Customers may use a scroll bar if there are too many items to show in the shopping cart.
- The shopping cart shows not only the items inside the cart but also the number and total price of the items in the cart.
- Customers can clear the shopping cart by clicking on a "Clear" button on the shopping cart page.
- Customers can also complete their shopping by clicking a "Checkout" button on the shopping cart page.
- The "Checkout" button should be in grey color and non-clickable when the shopping cart is empty.
- Once the "Checkout" button is clicked, an online order form shows up (either on the same page or on a new page), requesting the customer to fill in delivery details (name, address, suburb, state, country, phone number) and email address.
- A customer can click the "Place Order" button to place the order. Note that all the fields in the form must be completed before an order can be placed successfully.
- Once an order is placed successfully, a confirmation email will be sent to the customer's email address, with the order and delivery details attached.
