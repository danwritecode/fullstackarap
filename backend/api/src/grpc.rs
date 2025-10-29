use axum::http::Method;
use tonic::{Request, Response, Status, transport::Server};

use hello_world::greeter_server::{Greeter, GreeterServer};
use hello_world::{HelloReply, HelloRequest};
use tonic_web::GrpcWebLayer;
use tower_http::cors::{Any, CorsLayer};

pub mod hello_world {
    tonic::include_proto!("helloworld");
}

#[derive(Debug, Default)]
pub struct MyGreeter {}

#[tonic::async_trait]
impl Greeter for MyGreeter {
    async fn say_hello(
        &self,
        request: Request<HelloRequest>,
    ) -> Result<Response<HelloReply>, Status> {
        let request = request.into_inner();

        let reply = HelloReply {
            message: format!(
                "Hello there {} from a rust gRPC server! Here is the secret message: {}",
                request.name,
                request.message
            ),
        };

        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:50051".parse()?;
    let greeter = MyGreeter::default();

    Server::builder()
        .accept_http1(true)
        .layer(GrpcWebLayer::new())
        .add_service(GreeterServer::new(greeter))
        .serve(addr)
        .await?;

    Ok(())
}
