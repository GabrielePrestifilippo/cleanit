import {StyleSheet} from 'react-native';

const defaultRadius = 2;
export default StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    marginTop: 140,
    backgroundColor: '#80c446',
    borderRadius: 12,
    width: 150,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(200,200,250,0.8)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 40,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  smallText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'roboto',
  },
  getDensityStyle: density => {
    switch (density) {
      case 'high':
        return 'rgba(255,100,100,0.4)';
      default:
        return 'rgba(100,255,100,0.4)';
    }
  },
});
