curl -v -X POST --data '{"temperature":42,"humidity":73}' http://localhost:4040/api/v1/send/0000/telemetry --header "Content-Type:application/json"
