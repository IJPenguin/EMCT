import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:location/location.dart';
import 'package:http/http.dart' as http;
import 'dart:ui';
import 'dart:async';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final cameras = await availableCameras();
  runApp(MyApp(cameras: cameras));
}

class MyApp extends StatelessWidget {
  final List<CameraDescription> cameras;

  const MyApp({required this.cameras});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.green,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: LogoPage(cameras: cameras),
      // HomePage(cameras: cameras),
    );
  }
}

class LogoPage extends StatefulWidget {
  final List<CameraDescription> cameras;

  const LogoPage({required this.cameras});

  @override
  State<LogoPage> createState() => _LogoPageState();
}

class _LogoPageState extends State<LogoPage> {
  @override
  void initState() {
    super.initState();

    // Navigate to the home page after 6 seconds
    Timer(Duration(seconds: 6), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (context) => HomePage(
                cameras: widget
                    .cameras)), // Replace 'MyApp' with the name of your main app widget
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 166, 194, 168),
      // backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'asset/logo.jpg',
              width: 150,
              height: 150,
            ),
            SizedBox(
              height: 20,
            ),
            Text('EMCT', style: TextStyle(fontSize: 32, color: Colors.green, fontWeight: FontWeight.bold),)
          ],
        ),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  final List<CameraDescription> cameras;

  const HomePage({required this.cameras});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late CameraController _cameraController;
  late XFile _imageFile;

  @override
  void initState() {
    super.initState();
    _cameraController =
        CameraController(widget.cameras.first, ResolutionPreset.medium);
    _cameraController.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    });
  }

  @override
  void dispose() {
    _cameraController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_cameraController.value.isInitialized) {
      return Container();
    }

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.white, Colors.white],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            CameraPreview(_cameraController),
            ElevatedButton(
              onPressed: () async {
                _imageFile = (await _takePicture(context))!;
                if (_imageFile != null) {
                  Position? location = await _getLocation(context);
                  if (location != null) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ReportPage(
                          imageFile: _imageFile,
                          location: location,
                        ),
                      ),
                    );
                  } else {
                    // Handle the case where location is null
                  }
                } else {
                  // Handle the case where imageFile is null
                }
              },
              style: ElevatedButton.styleFrom(primary: Colors.blue),
              child: Icon(Icons.camera_alt),
            ),
          ],
        ),
      ),
    );
  }

  Future<XFile?> _takePicture(BuildContext context) async {
    try {
      XFile imageFile = await _cameraController.takePicture();
      return imageFile;
    } catch (e) {
      print('Error taking picture: $e');
      return null;
    }
  }

  Future<Position?> _getLocation(BuildContext context) async {
    Location location = Location();
    bool _serviceEnabled;
    PermissionStatus _permissionGranted;
    LocationData _locationData;

    _serviceEnabled = await location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await location.requestService();
      if (!_serviceEnabled) {
        return null;
      }
    }

    _permissionGranted = await location.hasPermission();
    if (_permissionGranted == PermissionStatus.denied) {
      _permissionGranted = await location.requestPermission();
      if (_permissionGranted != PermissionStatus.granted) {
        return null;
      }
    }

    _locationData = await location.getLocation();
    return Position(
      latitude: _locationData.latitude ?? 0.0,
      longitude: _locationData.longitude ?? 0.0,
      timestamp: DateTime.now(),
      accuracy: _locationData.accuracy ?? 0.0,
      altitude: _locationData.altitude ?? 0.0,
      heading: _locationData.heading ?? 0.0,
      speed: _locationData.speed ?? 0.0,
      altitudeAccuracy: 0.0,
      headingAccuracy: 0.0,
      speedAccuracy: 0.0,
    );
  }
}

class ReportPage extends StatelessWidget {
  final XFile imageFile;
  final Position location;

  const ReportPage({required this.imageFile, required this.location});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.white, Colors.white],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.file(File(imageFile.path)),
            Text(
                'Latitude: ${location.latitude}, Longitude: ${location.longitude}'),
            ElevatedButton(
              onPressed: () {
                // Handle sending the report
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ReportDetailsPage()),
                );
              },
              style: ElevatedButton.styleFrom(primary: Colors.blue),
              child: Text('Report Incident'),
            ),
          ],
        ),
      ),
    );
  }
}

class ReportDetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.green.shade100, Colors.green],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Title:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              TextFormField(
                controller: titleController,
                decoration: InputDecoration(
                  hintText: 'Enter title',
                ),
              ),
              SizedBox(height: 16),
              Text(
                'Description (Optional):',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              TextFormField(
                controller: descriptionController,
                maxLines: 4,
                decoration: InputDecoration(
                  hintText: 'Enter description',
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  // Handle sending the report details
                  _sendReportDetails(context);
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => ThankYouPage()),
                  );
                },
                style: ElevatedButton.styleFrom(primary: Colors.blue),
                child: Text('Send Report'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _sendReportDetails(BuildContext context) async {
    // Get data from controllers
    String title = titleController.text;
    String description = descriptionController.text;

    // Validate data as needed

    // Prepare data to be sent in the request
    Map<String, dynamic> requestData = {
      'title': title,
      'description': description,
      // Add other data points as needed
    };

    // Convert data to JSON
    String jsonData = jsonEncode(requestData);

    // Make API request
    try {
      final request = http.MultipartRequest(
          'POST', Uri.parse('https://emctreportapi.azurewebsites.net/report'));
      request.fields['req_id'] = 'John Doe';
      request.fields['locatioin'] = 'John Doe';
      request.fields['title'] = 'John Doe';
      request.fields['description'] = 'John Doe';
      request.fields['time'] = 'John Doe';
      request.fields['is_reported'] = 'John Doe';
      request.files
          .add(await http.MultipartFile.fromBytes('img', imageFile.readAsBytesSync(), filename:'photo.jpg'));
      var response = await request.send();

      // Check the response status
      if (response.statusCode == 200) {
        // Handle successful response (report sent)
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ThankYouPage()),
        );
      } else {
        // Handle unsuccessful response
        print('Error sending report: ${response.statusCode}');
        // You can show an error message or handle it in another way
      }
    } catch (error) {
      // Handle network errors
      print('Network error: $error');
      // You can show an error message or handle it in another way
    }
  }
}

// Add these controllers at the beginning of your file
final TextEditingController titleController = TextEditingController();
final TextEditingController descriptionController = TextEditingController();

class ThankYouPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: double.infinity,
        width: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.green.shade100, Colors.green],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text('Thank you for reporting!'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.popUntil(context, ModalRoute.withName('/'));
              },
              style: ElevatedButton.styleFrom(primary: Colors.blue),
              child: Text('Back to Home'),
            ),
          ],
        ),
      ),
    );
  }
}

class SavedImagesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Saved Images')),
      body: Center(
        child: Text('Display List of Saved Images Here'),
      ),
    );
  }
}
