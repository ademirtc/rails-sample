class SportsMap 
    load 'sensor.rb'
     attr_accessor :sensors
    def loadSensor latitude,longitude,radius
        # Here the query  for sensors is processed , that are within radius for consultation
        # for now only is charged with static JSON data
        jsensors= JSON.parse(File.read('app/assets/images/jsonIn'))
            File.open('salida.txt', 'w') do |f2|    
             @sensors=jsensors['data'].each do 
                  |s|  DrawableSensor.new(s["id"],s["value"],s["latitude"],s["longitude"],s["type"],s["radius"]) 
                #  |s|  sensor=DrawableSensor.new(s["id"],s["value"],s["latitude"],s["longitude"],s["type"],s["radius"]) 
                # str= sensor.id.to_s + sensor.value.to_s + sensor.type.to_s + sensor.color.to_s
                # f2.puts(str)
             end
         end
         processSensors
    end
    
    def processSensors
         # Processes the intersection of sensors and gets the points to draw on the map 
        # the input is a array of sensor who is this attribut
    end
end
