# Atlanta Brewery Tours

## Architecture

The application is built with a layered architecture, where each layer's dependencies can only point inwards. The layers are listed from inner most to outer most below:

### App

The application's global runtime layer. Code in this layer instantiates state, providers, routing, etc.

### Pages

Pages are the different routes that can be navigated to within the application, such as /neighborhoods/:slug. Page components are responsible for reading routing state and passing it to View components as props.

### Views

Views are stateful components that encapsulate view business logic. A single view can be displayed in many pages and even within other views.

### Domains

Domains encapsulate high-level concepts and business logic related to the application's domain model. Examples include Tours, Neighborhoods, etc.

### Core

Core code is abstract, stable, and reusable. It includes shared components, utility functions, React hooks, etc.
