const express = require("express");
var request = require("request");
const app = express();

app.get("/api", (get, res) => {
  var options = {
    method: "GET",
    url: "https://rest-api.lumen.me/new-subscriptions",
    headers: {
      Authorization:
        'Bearer "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4YmZhNzU2NDk4ZmRjNTZlNmVmODQ4YWY5NTI5ZThiZWZkZDM3NDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbHVtZW4tYzY2OTAiLCJhdWQiOiJsdW1lbi1jNjY5MCIsImF1dGhfdGltZSI6MTY2MTE2MzA2MCwidXNlcl9pZCI6InByZUtZWER2UVJkTEx2RzdEanNJQTJNUHhYTzIiLCJzdWIiOiJwcmVLWVhEdlFSZExMdkc3RGpzSUEyTVB4WE8yIiwiaWF0IjoxNjYxMTYzMDYwLCJleHAiOjE2NjExNjY2NjAsImVtYWlsIjoiaHdfcmVwb3J0ZXJAbHVtZW4ubWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaHdfcmVwb3J0ZXJAbHVtZW4ubWUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.AddDjyVuWnOWAC-vMlMQDwRWGhrc3dzTwaazWTn9QXN7qyYdrA-ZhSw_a2EvQCVmuYEuaquNSuSqNKd4VG_vq3SUyn8XZfmDXxPuEoU_hFyzcRhVJvOvYGe0TG0Hxrw-EgTMeRpy-2fhYju3KreVMl0SbJvJ9cpTLWs_XjNxok0gSQ5GeJelZtacEfsOiVs7C54wBbwxNKsecnPIDmAXvn5gVrDTAy80ND9YFYrfkSVsRcaX_ogVvTxQNBWLgb57RrApNsnUb9WthOSnBaOT6oSkAXX1ZTy3OGvs5pq2eJdtibqEatb9T4JDZJtL8BvFwIs2VpGPRH0ZXyEOddbC2Q"',
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const data = response.body;
    res.send(data);
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
