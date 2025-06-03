import React, { useState } from 'react';
import { MapPin, Car, Cloud, TrafficCone, Lightbulb, Home, Menu } from 'lucide-react';

// Centralized Data for Andhra Pradesh Districts (Expanded Illustrative Data)
// IMPORTANT: This data is illustrative. Replace it with your actual research findings for each district and areas.
const districtsData = {
  "Srikakulam": {
    accidents: [
      { name: 'Palasa Bypass Road', description: 'National Highway stretch, high speed, prone to head-on collisions and pedestrian accidents.', causes: ['Overspeeding', 'Improper overtaking', 'Pedestrian crossing', 'Lack of proper lighting'], lat: 18.78, lng: 84.09 },
      { name: 'Ichapuram Junction', description: 'Border area, heavy truck movement, complex intersection, frequent signal violations.', causes: ['Fatigue driving', 'Signal jumping', 'Poor visibility at night', 'Unmarked turns'], lat: 19.12, lng: 84.70 },
      { name: 'Srikakulam Town Entry', description: 'Congested area, mixed traffic, sudden turns, and unauthorized parking causing bottlenecks.', causes: ['Lack of lane discipline', 'Jaywalking', 'Unmarked speed breakers', 'Illegal parking'], lat: 18.28, lng: 83.90 },
      { name: 'Tekkali-Narasannapeta Road', description: 'Rural highway, unlit sections, animal crossing, and two-wheeler skidding.', causes: ['Drunk driving', 'Animal hazards', 'Poor road surface', 'Lack of reflective markers'], lat: 18.40, lng: 84.20 },
      { name: 'Amadalavalasa Railway Crossing', description: 'Unmanned or poorly guarded railway crossing, high risk of train-vehicle collisions.', causes: ['Driver negligence', 'Lack of gates', 'Poor visibility of approaching trains'], lat: 18.22, lng: 83.90 },
    ],
    pollution: [
      { name: 'Etcherla Industrial Zone', description: 'Small-scale industries emissions, including brick kilns and agro-processing units, contributing to air pollution.', pollutants: ['PM2.5', 'VOCs', 'Soot', 'Sulphur Dioxide'], illustrativeAQI: 'Moderate (90)', lat: 18.26, lng: 83.89 },
      { name: 'Srikakulam Urban Center', description: 'Vehicular emissions, construction dust, and open waste burning in residential areas.', pollutants: ['PM10', 'NOx', 'Dioxins', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (85)', lat: 18.28, lng: 83.90 },
      { name: 'Vamsadhara River Banks', description: 'Agricultural runoff (pesticides, fertilizers) and domestic sewage discharge, affecting water quality.', pollutants: ['Pesticides', 'Nitrates', 'Fecal Coliform', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 18.20, lng: 83.85 },
      { name: 'Palasa Cashew Processing Units', description: 'Dust and smoke from cashew roasting and processing, affecting local air quality.', pollutants: ['Particulates', 'Smoke', 'Volatile Organic Compounds'], illustrativeAQI: 'Moderate (75)', lat: 18.78, lng: 84.09 },
      { name: 'Srikakulam Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to air and soil contamination.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 18.27, lng: 83.91 },
    ],
    traffic: [
      { name: 'Srikakulam Main Road', description: 'Market area, high pedestrian and vehicle density, narrow passages, and frequent bottlenecks.', peakHours: '9-11 AM, 5-8 PM', causes: ['Narrow roads', 'Unauthorized parking', 'Street vendors', 'Pedestrian jaywalking'], lat: 18.29, lng: 83.90 },
      { name: 'Amadalavalasa Junction', description: 'Railway connectivity, bus stand area, heavy public transport movement, and uncoordinated signals.', peakHours: 'Morning & Evening Commute', causes: ['Public transport movement', 'Lack of signal coordination', 'Pedestrian crossing', 'Auto rickshaw congestion'], lat: 18.22, lng: 83.90 },
      { name: 'Palasa Town Center', description: 'Commercial hub, mixed traffic, often congested due to market activity and on-street parking.', peakHours: 'Afternoons', causes: ['Local commerce', 'On-street parking', 'Auto rickshaw stands', 'Delivery vehicles'], lat: 18.78, lng: 84.09 },
      { name: 'Tekkali Bypass Junction', description: 'Intersection of bypass and town road, merging traffic, and occasional signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Lack of dedicated lanes', 'Signal delays', 'Heavy vehicle movement'], lat: 18.40, lng: 84.20 },
      { name: 'Narasannapeta Market Road', description: 'Local market area, high pedestrian and two-wheeler traffic, often unorganized.', peakHours: 'Afternoons', causes: ['Unorganized parking', 'Street vendors', 'Pedestrian movement', 'Narrow sections'], lat: 18.20, lng: 84.02 },
    ],
    recommendations: { general: ["Improve public transport frequency and routes to reduce private vehicle dependency.", "Promote sustainable waste management practices and community-led environmental initiatives."], specific: { accidents: ["Install rumble strips and clear signage on highway bypasses.", "Improve lighting and enforce traffic rules at Ichapuram Junction.", "Conduct regular road safety audits for rural roads.", "Implement safety measures at railway crossings."], pollution: ["Implement stricter emission controls for industrial zones.", "Launch public awareness campaigns on waste disposal and discourage open burning.", "Promote organic farming to reduce agricultural runoff.", "Monitor river water quality regularly."], traffic: ["Create dedicated bus stops and parking zones to ease congestion.", "Optimize traffic signal timings in town centers.", "Regulate street vendors and enforce parking rules in market areas.", "Develop alternative routes for heavy vehicles."] } }
  },
  "Parvathipuram Manyam": {
    accidents: [
      { name: 'Salur Ghat Road', description: 'Hilly terrain, sharp curves, prone to vehicle overturning and skidding, especially during monsoons.', causes: ['Unsafe overtaking', 'Brake failure', 'Driver inexperience', 'Wet roads'], lat: 18.52, lng: 83.22 },
      { name: 'Parvathipuram Bypass', description: 'New road, high speed potential, sometimes used by locals for shortcuts, leading to unexpected entries.', causes: ['Overspeeding', 'Animal crossing', 'Unmarked access points', 'Lack of proper lighting'], lat: 18.89, lng: 83.42 },
      { name: 'Bobbili Road Junction', description: 'Connects two towns, moderate traffic, sometimes unlit, leading to poor visibility at intersections.', causes: ['Poor visibility', 'Lack of clear signage', 'Drunk driving', 'Signal jumping'], lat: 18.58, lng: 83.37 },
      { name: 'Seethampeta Tribal Area Road', description: 'Rural, winding roads, limited infrastructure, and uneven surfaces.', causes: ['Uneven road surface', 'Lack of guardrails', 'Animal hazards', 'Driver negligence'], lat: 18.60, lng: 83.20 },
      { name: 'Kurupam Road', description: 'Connects to interior tribal areas, narrow and unpaved sections, challenging terrain.', causes: ['Poor road condition', 'Overloading', 'Limited visibility', 'Driver fatigue'], lat: 18.80, lng: 83.50 },
    ],
    pollution: [
      { name: 'Bobbili Industrial Cluster', description: 'Agricultural processing units, rice mills, and some small foundries contributing to air and noise pollution.', pollutants: ['PM10', 'Odour', 'Sulphur Dioxide', 'Noise'], illustrativeAQI: 'Good (60)', lat: 18.58, lng: 83.37 },
      { name: 'Parvathipuram Urban Waste Dumps', description: 'Open dumping and occasional burning of municipal waste, leading to air and soil contamination.', pollutants: ['Methane', 'Dioxins', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Moderate (80)', lat: 18.89, lng: 83.42 },
      { name: 'Nagavali River Stretch', description: 'Agricultural runoff and domestic sewage affecting water quality, especially downstream of settlements.', pollutants: ['Pesticides', 'Nitrates', 'Fecal Coliform', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 18.80, lng: 83.30 },
      { name: 'Forest Fringe Areas', description: 'Illegal logging and occasional forest fires contributing to air pollution and soil erosion.', pollutants: ['Smoke', 'Particulates', 'Soil Erosion'], illustrativeAQI: 'Good (50)', lat: 18.70, lng: 83.25 },
      { name: 'Salur Market Area', description: 'Waste from market activities and improper disposal, leading to localized pollution.', pollutants: ['Organic Waste', 'Plastic Waste', 'Odour'], illustrativeAQI: 'Local Impact', lat: 18.52, lng: 83.22 },
    ],
    traffic: [
      { name: 'Parvathipuram Town Center', description: 'Market traffic, local vehicles, narrow streets, and high pedestrian activity, causing frequent jams.', peakHours: 'Afternoon, Market Days', causes: ['Narrow streets', 'Unorganized parking', 'Pedestrian jaywalking', 'Street vendors'], lat: 18.89, lng: 83.42 },
      { name: 'Bobbili Fort Road', description: 'Historical area, tourist and local traffic, sometimes congested due to limited road space and parking.', peakHours: 'Weekends', causes: ['Tourist vehicles', 'Limited parking', 'Slow-moving traffic', 'Roadside hawkers'], lat: 18.58, lng: 83.37 },
      { name: 'Salur Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Auto rickshaw stands'], lat: 18.52, lng: 83.22 },
      { name: 'Palakonda Main Road', description: 'Connects to agricultural areas, mixed vehicle types, and narrow sections, causing slow movement.', peakHours: 'Morning', causes: ['Farm vehicles', 'Narrow sections', 'Lack of overtaking space', 'Unmarked turns'], lat: 18.78, lng: 83.75 },
      { name: 'Manyam District Collectorate Road', description: 'Administrative hub, increased traffic during office hours and public gatherings.', peakHours: 'Office Hours', causes: ['Government office traffic', 'Parking issues', 'Pedestrian movement'], lat: 18.89, lng: 83.42 },
    ],
    recommendations: { general: ["Enhance road signage and safety infrastructure, especially in hilly and rural areas.", "Promote sustainable waste management and environmental protection initiatives.", "Improve public transport infrastructure to reduce private vehicle use."], specific: { accidents: ["Implement speed cameras and strict enforcement on ghat roads.", "Improve lighting and clear signage on bypass roads and rural roads.", "Install guardrails and improve road surface in accident-prone areas."], pollution: ["Encourage green practices in agricultural processing industries.", "Develop proper waste disposal and recycling systems for urban and rural areas.", "Monitor river water quality and prevent illegal logging."], traffic: ["Designate clear parking zones in town centers and manage market day traffic.", "Improve public transport infrastructure and dedicated auto stands.", "Regulate tourist vehicle movement and provide organized parking."] } }
  },
  "Vizianagaram": {
    accidents: [
      { name: 'Nellimarla Junction', description: 'Crossroads with highway access, high-speed turning, and frequent signal violations.', causes: ['Signal violation', 'Blind spots', 'Lack of clear lane markings', 'Overspeeding'], lat: 18.05, lng: 83.47 },
      { name: 'Ramabhadrapuram Road', description: 'Rural highway section, often used for long-distance travel, unlit stretches, and animal crossing.', causes: ['Drowsy driving', 'Poor road lighting', 'Animal crossing', 'Unmarked turns'], lat: 18.50, lng: 83.05 },
      { name: 'Vizianagaram Bypass (NH16)', description: 'High-speed bypass, frequent lane changes, and lack of median barriers leading to head-on collisions.', causes: ['Overspeeding', 'Improper merging', 'Lack of median barriers', 'Driver fatigue'], lat: 18.10, lng: 83.40 },
      { name: 'Gajapathinagaram Road', description: 'Connects to interior areas, mixed traffic, occasional potholes, and narrow sections.', causes: ['Poor road surface', 'Unmarked turns', 'Overloading', 'Lack of reflective markers'], lat: 18.20, lng: 83.20 },
      { name: 'Bobbili-Cheepurupalli Road', description: 'State highway, moderate traffic, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unsafe overtaking', 'Pedestrian crossing'], lat: 18.25, lng: 83.30 },
    ],
    pollution: [
      { name: 'Vizianagaram Textile Area', description: 'Industrial discharge and air emissions from dyeing and processing units, affecting air and water.', pollutants: ['PM2.5', 'Dyes', 'VOCs', 'Wastewater'], illustrativeAQI: 'Moderate (110)', lat: 18.10, lng: 83.40 },
      { name: 'Urban Residential Zones', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'NOx', 'Soot', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (95)', lat: 18.10, lng: 83.40 },
      { name: 'Champa River Stretch', description: 'Receives urban and industrial runoff, severely affecting water quality downstream of discharge points.', pollutants: ['Organic Pollutants', 'Heavy Metals', 'Fecal Coliform'], illustrativeAQI: 'Water Quality Alert', lat: 18.05, lng: 83.35 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates', 'Soil Contamination'], illustrativeAQI: 'Soil/Water Contamination Risk', lat: 18.15, lng: 83.25 },
      { name: 'Vizianagaram Municipal Solid Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 18.11, lng: 83.41 },
    ],
    traffic: [
      { name: 'Maharajah’s College Road', description: 'Educational institutions, public transport, high student movement, and illegal parking causing congestion.', peakHours: 'School/College hours (8-10 AM, 4-6 PM)', causes: ['Student movement', 'Congested intersections', 'Illegal parking', 'Pedestrian jaywalking'], lat: 18.10, lng: 83.40 },
      { name: 'Fort Area', description: 'Heritage site, tourist traffic, narrow approach roads, and limited parking leading to bottlenecks.', peakHours: 'Weekends, Tourist Season', causes: ['Tourist vehicles', 'Limited parking', 'Slow-moving traffic', 'Roadside vendors'], lat: 18.10, lng: 83.40 },
      { name: 'RTC Complex Area', description: 'Main bus stand, constant bus and auto movement, and pedestrian crossings leading to severe congestion.', peakHours: 'All day', causes: ['Public transport congestion', 'Pedestrian jaywalking', 'Unregulated vendors', 'Illegal parking'], lat: 18.10, lng: 83.40 },
      { name: 'Kothavalasa Junction', description: 'Connects to rural areas, mixed traffic, often creates bottlenecks due to merging traffic and uncoordinated signals.', peakHours: 'Morning & Evening', causes: ['Merging traffic', 'Lack of signal coordination', 'Agricultural vehicles', 'Heavy vehicle movement'], lat: 17.95, lng: 83.15 },
      { name: 'Dasannapeta Main Road', description: 'Commercial and residential area, high vehicle density, and frequent traffic jams.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Pedestrian movement'], lat: 18.10, lng: 83.38 },
    ],
    recommendations: { general: ["Promote sustainable waste management and environmental conservation through community participation.", "Develop smart traffic signal systems and improve public transport infrastructure to reduce congestion."], specific: { accidents: ["Improve road lighting and enforce signal adherence at Nellimarla Junction.", "Install cautionary signs and rumble strips on rural highways.", "Implement median barriers and enforce speed limits on bypass roads.", "Conduct regular road safety audits for rural roads."], pollution: ["Implement stricter industrial emission norms and wastewater treatment for textile units.", "Launch public awareness campaigns on waste segregation and discourage open burning.", "Monitor river water quality regularly and promote organic farming."], traffic: ["Optimize traffic signal timings around educational institutions and major junctions.", "Develop dedicated parking facilities for tourist areas and commercial hubs.", "Regulate public transport movement and create dedicated auto stands.", "Improve road widening in congested areas."] } }
  },
  "Visakhapatnam": {
    accidents: [
      { name: 'Hanumanthawaka Junction', description: 'High traffic volume, multiple merging lanes, complex signal system, prone to high-speed collisions and lane cutting.', causes: ['High speed', 'Lane indiscipline', 'Signal jumping', 'Pedestrian crossing issues', 'Lack of clear signage'], lat: 17.7588, lng: 83.3323 },
      { name: 'Maddilapalem Junction', description: 'Busy intersection with multiple roads converging, frequent minor collisions and side-impacts.', causes: ['Signal jumping', 'Lack of clear lane markings', 'Heavy vehicle movement', 'Unsafe turns', 'Driver negligence'], lat: 17.7289, lng: 83.3104 },
      { name: 'NAD Kotha Road', description: 'Major artery, commercial establishments, high pedestrian activity, and illegal parking causing obstructions.', causes: ['Illegal parking', 'Pedestrian jaywalking', 'Over-speeding in urban zones', 'Lack of footpaths', 'Unregulated vendors'], lat: 17.73, lng: 83.21 },
      { name: 'Port Area Roads', description: 'Heavy vehicle traffic (trucks) to and from the port, poor road conditions, and limited visibility leading to truck accidents.', causes: ['Overloading', 'Driver fatigue', 'Potholes', 'Limited visibility', 'Improper parking of trucks'], lat: 17.6900, lng: 83.2700 },
      { name: 'Arilova Colony Road', description: 'Residential area, steep slopes, narrow roads, and frequent two-wheeler accidents.', causes: ['Steep gradient', 'Narrow roads', 'Two-wheeler skidding', 'Lack of speed control'], lat: 17.75, lng: 83.30 },
      { name: 'Rushikonda Beach Road', description: 'Tourist hotspot, high speeds, sometimes slippery due to sand, and pedestrian crossing.', causes: ['Overspeeding', 'Pedestrian crossing', 'Lack of barricades', 'Slippery road surface'], lat: 17.7800, lng: 83.3800 },
    ],
    pollution: [
      { name: 'Gajuwaka Industrial Belt', description: 'Proximity to steel plant and other heavy industries, high particulate matter, SO2, and NOx levels in air.', pollutants: ['PM2.5', 'SO2', 'NOx', 'Heavy Metals', 'Fly Ash'], illustrativeAQI: 'Unhealthy (180)', lat: 17.6600, lng: 83.2000 },
      { name: 'Visakhapatnam Port Area', description: 'Coal dust, vehicular emissions from port operations, and industrial discharge into the sea.', pollutants: ['PM10', 'Coal Dust', 'SO2', 'Oil Spills (water)', 'Heavy Metals (water)'], illustrativeAQI: 'Unhealthy (120)', lat: 17.6900, lng: 83.2700 },
      { name: 'Dolphin’s Nose Area', description: 'Industrial outflow affecting coastal water quality, marine pollution, and chemical contamination.', pollutants: ['Heavy Metals (water)', 'Oil', 'Chemicals', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 17.67, lng: 83.27 },
      { name: 'Simhachalam Hills (Air)', description: 'Dust from quarrying and construction activities in surrounding areas, affecting air quality.', pollutants: ['PM10', 'Silica Dust', 'Noise'], illustrativeAQI: 'Moderate (90)', lat: 17.79, lng: 83.22 },
      { name: 'Akkayyapalem Urban Area', description: 'High vehicular emissions, domestic waste burning, and improper sewage disposal.', pollutants: ['PM2.5', 'NOx', 'Soot', 'Dioxins'], illustrativeAQI: 'Unhealthy (135)', lat: 17.72, lng: 83.29 },
      { name: 'Beach Road (Air & Water)', description: 'Vehicular emissions, plastic waste from tourism, affecting air and marine environment.', pollutants: ['PM2.5', 'Plastic Waste (marine)', 'Hydrocarbons'], illustrativeAQI: 'Moderate (70)', lat: 17.73, lng: 83.33 },
    ],
    traffic: [
      { name: 'Dabagardens Junction', description: 'Central business district, high vehicle and pedestrian movement, frequent bottlenecks, and unorganized parking.', peakHours: '8-10 AM, 5-7 PM', causes: ['High vehicle density', 'Unregulated vendors', 'Lack of parking', 'Signal timing issues', 'Pedestrian jaywalking'], lat: 17.7126, lng: 83.2974 },
      { name: 'RTC Complex Road', description: 'High pedestrian activity, constant bus movement, auto stands, and narrow carriageway causing congestion.', peakHours: 'All day, especially evenings', causes: ['Jaywalking', 'Improper parking', 'Bus stops causing congestion', 'Narrow carriageway', 'Unregulated auto stands'], lat: 17.7296, lng: 83.3039 },
      { name: 'Siripuram Junction', description: 'Residential and commercial traffic, multiple merging points, and signal coordination issues leading to jams.', peakHours: 'Evenings, Weekends', causes: ['Signal coordination issues', 'Turning conflicts', 'High volume of private vehicles', 'Lack of lane discipline'], lat: 17.73, lng: 83.31 },
      { name: 'Rushikonda Beach Road', description: 'Tourist hotspot, especially congested on weekends and holidays, limited parking, and roadside hawkers.', peakHours: 'Weekends (Afternoon/Evening)', causes: ['Tourist vehicles', 'Limited parking', 'Narrow roads', 'Illegal hawkers', 'Pedestrian movement'], lat: 17.7800, lng: 83.3800 },
      { name: 'Gajuwaka Main Road', description: 'Industrial and commercial area, heavy truck traffic, and frequent bottlenecks.', peakHours: 'Morning & Evening', causes: ['Heavy vehicle movement', 'Industrial traffic', 'Lack of dedicated lanes', 'Unorganized parking'], lat: 17.66, lng: 83.20 },
      { name: 'Muralinagar Junction', description: 'Residential and commercial intersection, high traffic volume, and poor signal management.', peakHours: 'Peak Commuting Hours', causes: ['Signal delays', 'Lane cutting', 'High private vehicle density', 'Pedestrian crossing'], lat: 17.73, lng: 83.28 },
    ],
    recommendations: { general: ["Promote public transportation and non-motorized transport (cycling, walking) to reduce vehicular traffic.", "Strict monitoring of industrial emissions and comprehensive waste management.", "Implement smart traffic management systems and urban planning."], specific: { accidents: ["Install traffic cameras and enforce signal adherence at Maddilapalem and Hanumanthawaka.", "Improve pedestrian infrastructure and lighting near NAD Kotha Road.", "Conduct regular road safety audits and improve road conditions on port roads.", "Implement speed calming measures in residential areas."], pollution: ["Encourage green industrial practices and cleaner fuels.", "Implement stricter regulations on port emissions and dust suppression.", "Improve waste management, discourage open burning, and promote recycling.", "Invest in sewage treatment plants and monitor coastal water quality."], traffic: ["Optimize traffic signals at Dabagardens and Siripuram Junctions.", "Enforce parking rules on RTC Complex Road and develop dedicated parking facilities.", "Regulate tourist vehicle entry and parking at Rushikonda.", "Develop alternative routes and improve road infrastructure in Gajuwaka."] } }
  },
  "Alluri Sitharama Raju": {
    accidents: [
      { name: 'Paderu Ghat Road', description: 'Mountainous road, steep slopes, prone to vehicle skidding and overturning, especially during monsoons and fog.', causes: ['Driver error', 'Fog', 'Wet roads', 'Overloading', 'Lack of guardrails'], lat: 17.96, lng: 82.66 },
      { name: 'Araku Valley Road', description: 'Tourist route, sharp bends, unfamiliar terrain for many drivers, and frequent two-wheeler accidents.', causes: ['Unfamiliar terrain', 'Overspeeding on turns', 'Lack of guardrails', 'Drunk driving'], lat: 18.33, lng: 82.87 },
      { name: 'Chintapalle-Lambasingi Road', description: 'Rural road, often unlit, dense forest area, and animal crossing.', causes: ['Animal crossing', 'Poor visibility', 'Drunk driving', 'Uneven road surface'], lat: 17.80, lng: 82.50 },
      { name: 'Downuru Junction', description: 'Crossroad in a tribal area, mixed vehicle types, and unmarked turns.', causes: ['Unmarked turns', 'Lack of clear signage', 'Slow-moving vehicles', 'Driver negligence'], lat: 17.70, lng: 82.40 },
      { name: 'Ananthagiri Hills Road', description: 'Scenic route, winding and narrow roads, popular with tourists, sometimes overloaded vehicles.', causes: ['Narrow roads', 'Overloading', 'Blind spots', 'Unsafe overtaking'], lat: 17.90, lng: 82.75 },
    ],
    pollution: [
      { name: 'Local Tribal Villages', description: 'Deforestation for shifting cultivation, smoke from cooking fires, and improper waste disposal.', pollutants: ['Smoke', 'Soil Erosion', 'Particulates', 'Organic Waste'], illustrativeAQI: 'Good (40)', lat: 18.00, lng: 82.70 },
      { name: 'Coffee Plantations (Runoff)', description: 'Use of pesticides and fertilizers in coffee cultivation, leading to runoff into water bodies.', pollutants: ['Pesticide Residues', 'Nitrates (water)', 'Soil Contamination'], illustrativeAQI: 'Water Quality Alert', lat: 18.20, lng: 82.80 },
      { name: 'Forest Fringe Areas', description: 'Illegal logging, occasional forest fires, affecting air quality and biodiversity.', pollutants: ['Smoke', 'Carbon Monoxide', 'Loss of Habitat'], illustrativeAQI: 'Good (55)', lat: 18.10, lng: 82.60 },
      { name: 'Local Markets (Waste)', description: 'Improper disposal of organic and plastic waste in open areas, leading to localized pollution.', pollutants: ['Odour', 'Methane', 'Plastic Waste'], illustrativeAQI: 'Local Impact', lat: 17.96, lng: 82.66 },
      { name: 'Bauxite Mining Areas (Proposed/Historical)', description: 'Dust and environmental degradation from mining activities (if any, as per local context).', pollutants: ['Bauxite Dust', 'Heavy Metals (soil/water)'], illustrativeAQI: 'Environmental Degradation Risk', lat: 17.95, lng: 82.55 },
    ],
    traffic: [
      { name: 'Paderu Market Area', description: 'Local market, weekly shandies, high pedestrian activity, and unorganized parking causing congestion.', peakHours: 'Market days (specific days)', causes: ['Crowds', 'Animal movement', 'Unorganized parking', 'Narrow access roads', 'Street vendors'], lat: 17.96, lng: 82.66 },
      { name: 'Araku Valley Tourist Hub', description: 'Tourist influx, bus and private vehicle movement, limited road space, and roadside vendors.', peakHours: 'Weekends, Festival Season', causes: ['Tourist vehicles', 'Limited parking', 'Slow-moving convoys', 'Roadside vendors', 'Pedestrian movement'], lat: 18.33, lng: 82.87 },
      { name: 'Chintapalle Town Center', description: 'Small town market, daily commuters, local transport, and narrow streets.', peakHours: 'Morning & Evening', causes: ['Local commerce', 'Auto rickshaws', 'Pedestrian crossings', 'Narrow streets'], lat: 17.80, lng: 82.50 },
      { name: 'Gudem Kotha Veedhi Junction', description: 'Crossroad connecting interior villages, mixed traffic, sometimes unorganized.', peakHours: 'Afternoons', causes: ['Agricultural vehicles', 'Unmarked turns', 'Lack of clear signals', 'Merging traffic'], lat: 17.75, lng: 82.30 },
      { name: 'Lambasingi Tourist Spot', description: 'Seasonal tourist destination, heavy vehicle movement during peak season, limited infrastructure.', peakHours: 'Winter Mornings', causes: ['Tourist vehicles', 'Fog', 'Limited parking', 'Roadside stalls'], lat: 17.71, lng: 82.50 },
    ],
    recommendations: { general: ["Promote sustainable tourism and tribal development through community involvement.", "Enhance road safety infrastructure in hilly areas and improve driver awareness.", "Encourage afforestation and responsible resource management."], specific: { accidents: ["Install guardrails and clear warning signs on ghat roads.", "Implement speed limits and enforce safe driving practices in tourist areas.", "Improve road lighting and clear vegetation on rural roads.", "Conduct regular road safety audits and address specific black spots."], pollution: ["Encourage community-based waste management in villages.", "Promote organic farming and reduce pesticide use in plantations.", "Support afforestation programs to prevent soil erosion.", "Monitor potential impacts from mining activities and ensure environmental compliance."], traffic: ["Manage market day traffic effectively with designated parking.", "Regulate tourist vehicle entry and provide organized parking in Araku.", "Improve road infrastructure and signage in interior areas.", "Develop strategies for managing seasonal tourist traffic."] } }
  },
  "Anakapalli": {
    accidents: [
      { name: 'Anakapalli Bypass (NH16)', description: 'National Highway, high-speed zone, frequent rear-end collisions and lane cutting.', causes: ['Overspeeding', 'Lack of service roads', 'Sudden braking', 'Improper merging'], lat: 17.69, lng: 83.02 },
      { name: 'Chodavaram Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 17.69, lng: 82.90 },
      { name: 'Narsipatnam Road Junction', description: 'Busy intersection connecting multiple towns, heavy traffic, and frequent signal violations.', causes: ['Signal jumping', 'Lane indiscipline', 'Blind spots', 'High vehicle volume'], lat: 17.68, lng: 82.80 },
      { name: 'Yelamanchili Highway Stretch', description: 'State highway, long straight sections, tempting overspeeding, and lack of dividers.', causes: ['High speed', 'Fatigue driving', 'Lack of dividers', 'Improper overtaking'], lat: 17.55, lng: 82.85 },
      { name: 'Pendurthi-Anakapalli Road', description: 'Connects urban and rural areas, mixed traffic, sometimes narrow and congested.', causes: ['Narrow sections', 'Unorganized parking', 'Pedestrian movement', 'Auto rickshaw congestion'], lat: 17.70, lng: 83.10 },
    ],
    pollution: [
      { name: 'Anakapalli Industrial Zone', description: 'Sugar factories, jaggery units, and some small manufacturing. Air and water pollution from emissions and discharge.', pollutants: ['Particulates', 'Odour', 'Sulphur Dioxide', 'Wastewater'], illustrativeAQI: 'Moderate (100)', lat: 17.69, lng: 83.00 },
      { name: 'Anakapalli Urban Area', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM2.5', 'PM10', 'NOx', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (90)', lat: 17.70, lng: 83.01 },
      { name: 'Sarada River Stretch', description: 'Receives agricultural and urban runoff, affecting water quality, especially during monsoons.', pollutants: ['Pesticide Residues', 'Organic Waste', 'Fecal Coliform'], illustrativeAQI: 'Water Quality Alert', lat: 17.65, lng: 82.95 },
      { name: 'Agricultural Fields (Stubble Burning)', description: 'Seasonal burning of crop residue, contributing to air pollution and haze.', pollutants: ['Smoke', 'Carbon Monoxide', 'Particulates'], illustrativeAQI: 'Seasonal Impact', lat: 17.75, lng: 83.05 },
      { name: 'Komarada Waste Dump', description: 'Open dumping of municipal solid waste, leading to localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 17.68, lng: 83.03 },
    ],
    traffic: [
      { name: 'Anakapalli Town Center', description: 'Commercial area, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Unorganized parking', 'Narrow lanes', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 17.70, lng: 83.01 },
      { name: 'Chodavaram Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 17.69, lng: 82.90 },
      { name: 'Narsipatnam Main Road', description: 'Town center, market area, mixed traffic, and lack of designated parking.', peakHours: 'Afternoons', causes: ['Local commerce', 'Poor road discipline', 'Lack of designated parking', 'Slow-moving vehicles'], lat: 17.68, lng: 82.80 },
      { name: 'Payakaraopeta Junction', description: 'Connects to highway, merging traffic, sometimes signal issues, and heavy vehicle movement.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 17.50, lng: 82.55 },
      { name: 'Kasimkota Road', description: 'Connects to industrial areas, increased truck traffic, and sometimes narrow sections.', peakHours: 'Morning', causes: ['Industrial traffic', 'Narrow roads', 'Overloading', 'Unsafe overtaking'], lat: 17.65, lng: 82.98 },
    ],
    recommendations: { general: ["Improve road safety awareness and infrastructure through public campaigns and engineering solutions.", "Promote industrial pollution control and sustainable agricultural practices.", "Optimize traffic flow and parking solutions in urban areas."], specific: { accidents: ["Enforce speed limits strictly on bypass roads.", "Improve lighting and signage on rural stretches.", "Implement traffic calming measures at busy junctions.", "Conduct regular road safety audits and address black spots."], pollution: ["Promote industrial wastewater treatment and air emission controls.", "Encourage proper waste disposal and discourage stubble burning.", "Monitor river water quality regularly and prevent illegal dumping.", "Support green initiatives in industrial zones."], traffic: ["Regulate market traffic and enforce parking rules.", "Develop dedicated bus stops and pedestrian pathways.", "Optimize traffic signal timings at key intersections.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "Kakinada": {
    accidents: [
      { name: 'Samalkota Road', description: 'Connects to industrial hub, heavy vehicle movement, frequent truck accidents, and poor road shoulders.', causes: ['Truck accidents', 'Overspeeding', 'Overloading', 'Poor road shoulders', 'Lack of dividers'], lat: 17.00, lng: 82.16 },
      { name: 'Jagannaickpur Bridge', description: 'Narrow bridge, high traffic, bottleneck, prone to side collisions and head-on crashes.', causes: ['Bottleneck', 'Blind spots', 'Improper overtaking', 'Lack of dividers', 'Limited road width'], lat: 16.96, lng: 82.23 },
      { name: 'Kakinada-Pithapuram Road', description: 'State highway, moderate to high speed, mixed traffic, and unmarked junctions.', causes: ['Unmarked junctions', 'Pedestrian crossing', 'Drunk driving', 'Lack of clear signage'], lat: 17.00, lng: 82.00 },
      { name: 'Port Area Entry/Exit', description: 'Busy entry/exit points for port, extremely heavy truck movement, and congestion leading to accidents.', causes: ['Truck congestion', 'Lane cutting', 'Poor visibility', 'Unorganized queues'], lat: 16.95, lng: 82.27 },
      { name: 'Gollaprolu Bypass', description: 'New bypass road, high speed, sometimes used by locals for shortcuts, leading to unexpected entries.', causes: ['Overspeeding', 'Unmarked access points', 'Animal crossing', 'Lack of proper lighting'], lat: 17.20, lng: 82.25 },
    ],
    pollution: [
      { name: 'Kakinada Port Area', description: 'Port operations, shipping emissions, coal handling dust, and oil spills affecting air and marine environment.', pollutants: ['PM10', 'SOx', 'NOx', 'Coal Dust', 'Oil Spills (water)', 'Heavy Metals (water)'], illustrativeAQI: 'Unhealthy (150)', lat: 16.95, lng: 82.27 },
      { name: 'Industrial Parks (Godavari Fertilizers)', description: 'Fertilizer units, other factories, air and water pollution from emissions and discharge.', pollutants: ['NOx', 'VOCs', 'Ammonia', 'Wastewater', 'Particulates'], illustrativeAQI: 'Unhealthy (140)', lat: 17.00, lng: 82.20 },
      { name: 'Kakinada Urban Area', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM2.5', 'PM10', 'Dioxins', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (115)', lat: 16.97, lng: 82.21 },
      { name: 'Uppada Beach Coastal Stretch', description: 'Plastic pollution, waste from tourism and fishing activities, affecting marine life and beach aesthetics.', pollutants: ['Microplastics', 'Solid Waste (marine)', 'Organic Waste'], illustrativeAQI: 'Coastal Pollution Risk', lat: 17.00, lng: 82.30 },
      { name: 'Kakinada Municipal Solid Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 16.98, lng: 82.22 },
    ],
    traffic: [
      { name: 'Main Road (Collectorate)', description: 'Government offices, commercial activity, high vehicle density, and on-street parking causing congestion.', peakHours: 'Office hours (9 AM - 6 PM)', causes: ['High vehicle density', 'On-street parking', 'Lack of dedicated lanes', 'Pedestrian movement', 'Commercial activity'], lat: 16.97, lng: 82.21 },
      { name: 'Gandhi Nagar Area', description: 'Residential and commercial mix, narrow lanes, high pedestrian movement, and unorganized parking.', peakHours: 'Evenings', causes: ['Narrow lanes', 'Pedestrian movement', 'Unorganized parking', 'Street vendors', 'Auto rickshaw congestion'], lat: 16.97, lng: 82.21 },
      { name: 'RTC Complex Area', description: 'Main bus stand, constant bus and auto movement, and pedestrian crossings leading to severe congestion.', peakHours: 'All day', causes: ['Public transport congestion', 'Pedestrian jaywalking', 'Unregulated vendors', 'Illegal parking', 'Bus stops causing obstruction'], lat: 16.97, lng: 82.21 },
      { name: 'Temple Street (Kakinada)', description: 'Religious area, mixed traffic, sometimes congested during festivals and special events.', peakHours: 'Festival days, Evenings', causes: ['Pilgrim movement', 'Temporary stalls', 'Limited road space', 'Unorganized parking'], lat: 16.97, lng: 82.21 },
      { name: 'Samalkota Town Center', description: 'Market area, mixed traffic, and frequent bottlenecks due to commercial activity.', peakHours: 'Afternoons', causes: ['Local commerce', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 17.00, lng: 82.16 },
    ],
    recommendations: { general: ["Promote green logistics and sustainable port operations.", "Implement stricter industrial regulations and comprehensive environmental monitoring.", "Improve traffic signal synchronization and parking management."], specific: { accidents: ["Expand roads near Samalkota and improve truck lane discipline.", "Install clear signage and dividers on Jagannaickpur Bridge.", "Enforce speed limits and conduct road safety audits on state highways.", "Improve traffic management at port entry/exit points."], pollution: ["Implement stricter emission controls for port and industrial areas.", "Promote proper waste disposal and recycling in urban areas.", "Organize regular beach cleanups and marine conservation efforts.", "Monitor industrial wastewater discharge and ensure treatment."], traffic: ["Optimize traffic signal timings and flow on Main Road.", "Develop dedicated parking facilities and pedestrian zones in Gandhi Nagar.", "Regulate bus and auto movement around RTC Complex.", "Manage pilgrim traffic effectively around temple areas."] } }
  },
  "East Godavari": {
    accidents: [
      { name: 'Rajahmundry Bypass', description: 'National Highway section, high speed, frequent lane changes, and improper median openings.', causes: ['High speed', 'Lack of proper median openings', 'Driver fatigue', 'Improper merging', 'Unmarked turns'], lat: 17.00, lng: 81.80 },
      { name: 'Kotipalli Road', description: 'Rural stretch, mixed traffic, often unlit, animal crossing, and poor road surface.', causes: ['Animal crossing', 'Poor road surface', 'Drunk driving', 'Unmarked turns', 'Lack of reflective markers'], lat: 16.60, lng: 82.10 },
      { name: 'Dowleswaram Barrage Road', description: 'Connects two sides of Godavari, heavy vehicle movement, narrow sections, and bottlenecks.', causes: ['Bottleneck', 'Overloading', 'Lack of overtaking space', 'Improper lane usage'], lat: 16.95, lng: 81.75 },
      { name: 'Mandapeta-Ramachandrapuram Road', description: 'State highway, moderate traffic, sometimes used for shortcuts, leading to unexpected entries.', causes: ['Unmarked junctions', 'Overspeeding', 'Pedestrian crossing', 'Lack of clear signage'], lat: 17.00, lng: 81.90 },
      { name: 'Kovvur-Rajahmundry Bridge', description: 'Old bridge, narrow lanes, heavy traffic, and frequent minor collisions.', causes: ['Narrow lanes', 'High vehicle volume', 'Lack of dividers', 'Improper overtaking'], lat: 17.00, lng: 81.70 },
    ],
    pollution: [
      { name: 'Industrial Estates (near Rajahmundry)', description: 'Paper mills, other industries, air and water pollution from emissions and discharge.', pollutants: ['PM2.5', 'Sulphur compounds', 'VOCs', 'Wastewater', 'Particulates'], illustrativeAQI: 'Unhealthy (130)', lat: 16.98, lng: 81.78 },
      { name: 'Godavari River Stretch (Urban)', description: 'Receives urban sewage and industrial discharge, severely affecting water quality.', pollutants: ['Fecal Coliform', 'Organic Pollutants', 'Heavy Metals', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 17.00, lng: 81.78 },
      { name: 'Rajahmundry Urban Area', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'NOx', 'Soot', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (105)', lat: 16.99, lng: 81.78 },
      { name: 'Agricultural Fields (Crop Residue Burning)', description: 'Seasonal burning of crop residue, contributing to air pollution and haze.', pollutants: ['Smoke', 'Carbon Monoxide', 'Particulates'], illustrativeAQI: 'Seasonal Impact', lat: 17.05, lng: 81.85 },
      { name: 'Kadiyam Nurseries (Pesticide Use)', description: 'Use of pesticides and fertilizers in nurseries, leading to runoff into local water bodies.', pollutants: ['Pesticide Residues', 'Nitrates (water)'], illustrativeAQI: 'Water Contamination Risk', lat: 16.90, lng: 81.70 },
    ],
    traffic: [
      { name: 'Pushkar Ghat Area (Rajahmundry)', description: 'Religious tourism, crowded, especially during festivals, and unorganized parking.', peakHours: 'Festival days, Morning & Evening', causes: ['Pilgrim movement', 'Temporary stalls', 'Limited road space', 'Unorganized parking', 'Pedestrian jaywalking'], lat: 16.99, lng: 81.78 },
      { name: 'Godavari Bridge Road', description: 'Key connectivity, bottleneck, high vehicle volume, and limited lanes causing congestion.', peakHours: 'All day', causes: ['High vehicle volume', 'Limited lanes', 'Slow-moving vehicles', 'Improper lane usage'], lat: 17.00, lng: 81.78 },
      { name: 'RTC Complex Area (Rajahmundry)', description: 'Main bus stand, constant bus and auto movement, and pedestrian crossings leading to severe congestion.', peakHours: 'All day', causes: ['Public transport congestion', 'Pedestrian jaywalking', 'Unregulated vendors', 'Illegal parking', 'Bus stops causing obstruction'], lat: 16.99, lng: 81.78 },
      { name: 'Main Road (near Railway Station)', description: 'Connects railway station to city, high commuter traffic, and auto rickshaw congestion.', peakHours: 'Train arrival/departure times', causes: ['Commuter rush', 'Auto rickshaw congestion', 'Limited parking', 'Pedestrian movement'], lat: 16.99, lng: 81.78 },
      { name: 'Morampudi Junction', description: 'Major city intersection, high traffic volume, and poor signal management.', peakHours: 'Peak Commuting Hours', causes: ['Signal delays', 'Lane cutting', 'High private vehicle density', 'Turning conflicts'], lat: 17.00, lng: 81.76 },
    ],
    recommendations: { general: ["Promote public transport and sustainable urban planning in Rajahmundry.", "Implement stricter environmental regulations and improved waste management.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Improve road markings and signage on bypass roads.", "Enforce speed limits and conduct road safety audits on rural stretches.", "Manage traffic flow and provide clear lane guidance on Dowleswaram Barrage road.", "Improve safety on old bridges."], pollution: ["Encourage sustainable industrial practices and invest in wastewater treatment.", "Monitor river water quality regularly and prevent open waste burning.", "Promote proper waste segregation and recycling.", "Discourage crop residue burning and promote alternative farming methods."], traffic: ["Manage crowd flow and parking during festivals at Pushkar Ghat.", "Explore options for widening Godavari Bridge road or alternative routes.", "Regulate bus and auto movement around RTC Complex and railway station.", "Optimize traffic signal timings at major junctions."] } }
  },
  "Dr. B. R. Ambedkar Konaseema": {
    accidents: [
      { name: 'Amalapuram-Kakinada Road', description: 'State highway, moderate speed, sometimes used by locals for shortcuts, leading to unexpected entries.', causes: ['Overspeeding', 'Unmarked junctions', 'Lack of clear signage', 'Improper merging'], lat: 16.57, lng: 82.00 },
      { name: 'Razole Bridge', description: 'Connects island areas, narrow, prone to overtaking issues and blind turns.', causes: ['Overtaking issues', 'Blind turns', 'Limited road width', 'Driver negligence'], lat: 16.48, lng: 81.87 },
      { name: 'Mummidivaram Road', description: 'Rural stretch, mixed traffic, often unlit, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 16.65, lng: 82.00 },
      { name: 'Island Ferry Points', description: 'Congested areas near ferry services, mixed vehicle types, and unorganized queues.', causes: ['Unorganized queues', 'Pedestrian movement', 'Lack of space', 'Improper parking'], lat: 16.50, lng: 81.90 },
      { name: 'Kothapeta-Ravulapalem Road', description: 'Connects two major towns, moderate traffic, sometimes narrow.', causes: ['Narrow sections', 'Unsafe overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 16.70, lng: 81.70 },
    ],
    pollution: [
      { name: 'Aquaculture Zones', description: 'Discharge from shrimp farms, affecting water quality and local ecosystems due to antibiotics and organic waste.', pollutants: ['Ammonia', 'Organic waste', 'Antibiotics (water)', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 16.40, lng: 82.00 },
      { name: 'Amalapuram Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Sulphur Dioxide (from generators)', 'Fecal Coliform'], illustrativeAQI: 'Moderate (90)', lat: 16.57, lng: 82.00 },
      { name: 'Godavari Delta Canals', description: 'Receiving agricultural runoff and domestic waste, affecting water quality and aquatic life.', pollutants: ['Pesticide Residues', 'Nitrates', 'Fecal Coliform', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 16.55, lng: 81.95 },
      { name: 'Coconut Processing Units', description: 'Waste from coconut husking and coir production, leading to localized organic waste pollution.', pollutants: ['Organic Waste', 'Dust', 'Odour'], illustrativeAQI: 'Local Impact', lat: 16.60, lng: 82.05 },
      { name: 'Razole Waste Dump', description: 'Open dumping of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 16.48, lng: 81.88 },
    ],
    traffic: [
      { name: 'Amalapuram Town Center', description: 'Market hub, daily commuters, commercial activity, narrow roads, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Local commerce', 'On-street parking', 'Pedestrian jaywalking', 'Auto rickshaw congestion', 'Narrow streets'], lat: 16.57, lng: 82.00 },
      { name: 'Razole Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 16.48, lng: 81.87 },
      { name: 'Kothapeta Main Road', description: 'Connects to other towns, mixed traffic, sometimes congested due to commercial activity.', peakHours: 'Afternoons', causes: ['Local commerce', 'Narrow sections', 'Lack of overtaking space', 'Delivery vehicles'], lat: 16.73, lng: 81.85 },
      { name: 'Boat Jetty Points', description: 'Congested areas near boat services, tourist and local movement, and unorganized queues.', peakHours: 'Weekends, Tourist Season', causes: ['Tourist movement', 'Unorganized queues', 'Limited space', 'Improper parking'], lat: 16.50, lng: 81.90 },
      { name: 'Ravulapalem Junction', description: 'Crossroad connecting major highways, heavy vehicle movement, and occasional signal delays.', peakHours: 'Peak Commuting Hours', causes: ['Merging traffic', 'Heavy vehicle movement', 'Signal delays', 'Lane indiscipline'], lat: 16.75, lng: 81.65 },
    ],
    recommendations: { general: ["Support sustainable aquaculture practices and promote environmental conservation.", "Improve road infrastructure and safety in island areas.", "Promote proper waste management in urban and rural areas."], specific: { accidents: ["Install cautionary signs and improve road markings on state highways.", "Widen narrow bridges and regulate overtaking.", "Improve lighting and signage on rural roads.", "Manage traffic flow at ferry points."], pollution: ["Regulate farm discharge and promote eco-friendly aquaculture.", "Improve urban waste collection and sewage treatment.", "Monitor canal water quality regularly and prevent illegal dumping.", "Promote sustainable waste management for agro-industrial units."], traffic: ["Manage market area parking and pedestrian flow.", "Develop dedicated bus stops and auto stands.", "Improve traffic flow at boat jetty points.", "Optimize traffic signal timings at major junctions."] } }
  },
  "Eluru": {
    accidents: [
      { name: 'Eluru Bypass (NH16)', description: 'Major highway, high-speed collisions, frequent lane changes, and lack of proper signage.', causes: ['Fatigue driving', 'Lane changing errors', 'Overspeeding', 'Lack of proper signage', 'Improper merging'], lat: 17.09, lng: 81.08 },
      { name: 'Vangayagudem Road', description: 'Rural road, mixed vehicle types, often unlit, animal crossing, and poor road condition.', causes: ['Poor road condition', 'Unlit stretches', 'Animal hazards', 'Drunk driving', 'Lack of reflective markers'], lat: 17.00, lng: 80.90 },
      { name: 'Denduluru Junction', description: 'Busy intersection, connects to agricultural areas, heavy vehicle movement, and blind spots.', causes: ['Signal jumping', 'Overloading', 'Blind spots', 'Lack of clear signage', 'Improper turns'], lat: 16.90, lng: 81.00 },
      { name: 'Kovvur Road', description: 'Connects to Godavari districts, moderate traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 17.00, lng: 81.20 },
      { name: 'Jangareddygudem Road', description: 'Connects to forest areas, winding roads, sometimes unlit, and animal crossing.', causes: ['Driver error', 'Animal hazards', 'Poor visibility', 'Lack of guardrails'], lat: 17.20, lng: 81.25 },
    ],
    pollution: [
      { name: 'Eluru City Center', description: 'Vehicular emissions, waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'Dioxins', 'NOx', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (105)', lat: 16.70, lng: 81.09 },
      { name: 'Kolleru Lake Surroundings', description: 'Agricultural runoff, industrial discharge from nearby units, affecting water quality and aquatic life.', pollutants: ['Pesticides', 'Heavy Metals', 'Nutrients (water)', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 16.67, lng: 81.25 },
      { name: 'Industrial Estates (Eluru)', description: 'Rice mills, oil mills, some chemical units. Air and water pollution from emissions and discharge.', pollutants: ['Particulates', 'Odour', 'Wastewater', 'VOCs'], illustrativeAQI: 'Moderate (115)', lat: 16.70, lng: 81.05 },
      { name: 'Municipal Solid Waste Dumps', description: 'Open dumping and burning of municipal solid waste, leading to localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)', 'Dioxins'], illustrativeAQI: 'Local Impact', lat: 16.68, lng: 81.07 },
      { name: 'Tadepalligudem Industrial Area', description: 'Food processing units, other industries, contributing to air and water pollution.', pollutants: ['Particulates', 'Odour', 'Wastewater'], illustrativeAQI: 'Moderate (95)', lat: 17.03, lng: 81.50 },
    ],
    traffic: [
      { name: 'Old Bus Stand Area', description: 'Public transport hub, dense activity, constant bus and auto movement, and illegal parking.', peakHours: 'Morning & Evening Commute', causes: ['Bus movement', 'Pedestrian crossing', 'Illegal parking', 'Congestion', 'Unregulated auto stands'], lat: 16.70, lng: 81.09 },
      { name: 'Fire Station Junction', description: 'Central intersection, multiple roads merge, and signal timing issues leading to bottlenecks.', peakHours: 'Office hours', causes: ['Signal timing', 'Lack of dedicated turns', 'High vehicle volume', 'Lane indiscipline'], lat: 16.70, lng: 81.10 },
      { name: 'Powerpet Area', description: 'Commercial and residential mix, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian movement', 'Local commerce'], lat: 16.70, lng: 81.08 },
      { name: 'Satyavada Road Junction', description: 'Connects to rural areas, mixed traffic, sometimes creates bottlenecks due to merging traffic.', peakHours: 'Morning', causes: ['Agricultural vehicles', 'Merging traffic', 'Unmarked turns', 'Slow-moving vehicles'], lat: 16.75, lng: 81.15 },
      { name: 'Dwaraka Tirumala Temple Road', description: 'Pilgrim route, increased traffic during festivals and weekends, limited parking.', peakHours: 'Festival days, Weekends', causes: ['Pilgrim movement', 'Limited parking', 'Roadside stalls', 'Bus congestion'], lat: 17.05, lng: 81.25 },
    ],
    recommendations: { general: ["Improve public transport infrastructure and services to reduce private vehicle use.", "Promote organic farming near Kolleru Lake and industrial pollution control.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Enhance highway patrolling and enforce speed limits on bypass roads.", "Improve road lighting and clear vegetation on rural stretches.", "Implement traffic calming measures at busy junctions.", "Conduct regular road safety audits and address black spots."], pollution: ["Promote sustainable agricultural practices around Kolleru Lake.", "Invest in wastewater treatment plants and proper waste disposal systems.", "Monitor industrial emissions and enforce environmental standards.", "Discourage open burning of waste."], traffic: ["Optimize traffic flow and signal timings at major junctions.", "Develop dedicated bus stops and auto stands.", "Enforce parking rules and create more parking facilities.", "Manage pilgrim traffic effectively around temple areas."] } }
  },
  "West Godavari": {
    accidents: [
      { name: 'Bhimavaram Bypass', description: 'Town bypass, high-speed potential, frequent lane changes, and lack of adequate signs.', causes: ['Overspeeding', 'Lack of adequate signs', 'Improper merging', 'Animal crossing'], lat: 16.54, lng: 81.52 },
      { name: 'Palakollu Road', description: 'Rural stretch, agricultural vehicles, often overloaded, and poor visibility.', causes: ['Overloading', 'Poor visibility', 'Animal crossing', 'Uneven road surface', 'Drunk driving'], lat: 16.53, lng: 81.73 },
      { name: 'Tanuku-Tadepalligudem Road', description: 'State highway, mixed traffic, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Unmarked turns', 'Lack of dividers', 'Unsafe overtaking'], lat: 16.75, lng: 81.50 },
      { name: 'Narasapuram Junction', description: 'Busy intersection connecting coastal areas, heavy vehicle movement, and blind spots.', causes: ['Signal jumping', 'Lane indiscipline', 'Blind spots', 'High vehicle volume'], lat: 16.45, lng: 81.70 },
      { name: 'Eluru-Bhimavaram Road', description: 'Major inter-district road, high traffic, sometimes narrow and congested.', causes: ['Narrow sections', 'High vehicle density', 'Improper parking', 'Pedestrian movement'], lat: 16.60, lng: 81.30 },
    ],
    pollution: [
      { name: 'Tadepalligudem Industrial Cluster', description: 'Food processing, rice mills, and some chemical units. Air and water pollution from emissions and discharge.', pollutants: ['Particulates', 'Odour', 'Wastewater', 'VOCs'], illustrativeAQI: 'Moderate (95)', lat: 17.03, lng: 81.50 },
      { name: 'Bhimavaram Urban Area', description: 'Vehicular emissions, domestic waste burning, and aquaculture waste leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Ammonia (from aquaculture)', 'Soot'], illustrativeAQI: 'Moderate (85)', lat: 16.54, lng: 81.52 },
      { name: 'Godavari River Tributaries', description: 'Receiving agricultural runoff and domestic sewage, affecting water quality and aquatic life.', pollutants: ['Pesticide Residues', 'Nitrates', 'Fecal Coliform', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 16.60, lng: 81.60 },
      { name: 'Aquaculture Ponds (Discharge)', description: 'Discharge from shrimp and fish farms affecting local water bodies and ecosystems.', pollutants: ['Nutrients', 'Algae Bloom', 'Organic Waste', 'Antibiotics'], illustrativeAQI: 'Water Quality Risk', lat: 16.40, lng: 81.65 },
      { name: 'Palakollu Waste Dump', description: 'Open dumping of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 16.53, lng: 81.74 },
    ],
    traffic: [
      { name: 'Bhimavaram Town Center', description: 'Commercial area, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Market activity', 'Unorganized parking', 'Narrow lanes', 'Street vendors', 'Pedestrian jaywalking'], lat: 16.54, lng: 81.52 },
      { name: 'Palakollu Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 16.53, lng: 81.73 },
      { name: 'Tanuku Main Road', description: 'Town center, market area, mixed traffic, and lack of designated parking.', peakHours: 'Afternoons', causes: ['Local commerce', 'Poor road discipline', 'Lack of designated parking', 'Slow-moving vehicles'], lat: 16.78, lng: 81.70 },
      { name: 'Undi Junction', description: 'Connects to rural areas, mixed traffic, sometimes creates bottlenecks due to merging traffic.', peakHours: 'Morning', causes: ['Agricultural vehicles', 'Merging traffic', 'Unmarked turns', 'Slow-moving vehicles'], lat: 16.60, lng: 81.65 },
      { name: 'Narasapuram Town Center', description: 'Commercial hub, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 16.45, lng: 81.70 },
    ],
    recommendations: { general: ["Promote public awareness on road safety and environmental protection.", "Encourage wastewater treatment and sustainable aquaculture practices.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Install clear signage and enforce speed limits on bypass roads.", "Improve road lighting and clear vegetation on rural stretches.", "Implement traffic calming measures at busy junctions.", "Conduct regular road safety audits and address black spots."], pollution: ["Promote industrial wastewater treatment and air emission controls.", "Encourage proper waste disposal and discourage open burning.", "Monitor river and aquaculture water quality regularly.", "Support green initiatives in industrial zones."], traffic: ["Manage town center parking and pedestrian flow.", "Develop dedicated bus stops and auto stands.", "Optimize traffic signal timings at key intersections.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "NTR District": {
    accidents: [
      { name: 'Benz Circle (Vijayawada)', description: 'Major junction, extremely heavy vehicle movement, complex signal system, prone to high-speed collisions and lane cutting.', causes: ['Overspeeding', 'Lane cutting', 'Signal jumping', 'Aggressive driving', 'High vehicle density'], lat: 16.5186, lng: 80.6433 },
      { name: 'Ramavarappadu Ring Road', description: 'High-speed corridor, frequent accidents, lack of pedestrian infrastructure, and uncontrolled access points.', causes: ['High speed', 'Lack of pedestrian infrastructure', 'Uncontrolled access points', 'Drunk driving', 'Improper merging'], lat: 16.5400, lng: 80.6600 },
      { name: 'Gannavaram Road', description: 'Connects to airport, fast-moving traffic, frequent U-turn violations, and improper overtaking.', causes: ['Distracted driving', 'U-turn violations', 'Improper overtaking', 'Lack of dividers', 'High speed'], lat: 16.53, lng: 80.70 },
      { name: 'Kanchikacherla Bypass', description: 'National Highway stretch, high speed, mixed traffic, and animal crossing.', causes: ['Overspeeding', 'Animal crossing', 'Poor visibility at night', 'Lack of proper signage'], lat: 16.68, lng: 80.37 },
      { name: 'Prakasam Barrage Road', description: 'Connects two sides of the city, high vehicle volume, narrow sections, and pedestrian movement.', causes: ['Narrow lanes', 'High vehicle volume', 'Pedestrian jaywalking', 'Improper parking'], lat: 16.50, lng: 80.61 },
      { name: 'Kandrika Bridge', description: 'Connects city parts, narrow choke point, high vehicle volume, and frequent minor collisions.', causes: ['Limited lanes', 'High vehicle volume', 'Merging traffic', 'Signal delays'], lat: 16.5100, lng: 80.6400 },
    ],
    pollution: [
      { name: 'Autonagar Industrial Area (Vijayawada)', description: 'Vehicular exhaust and small-scale industries, high PM2.5 and NOx levels, and noise pollution.', pollutants: ['PM2.5', 'NOx', 'VOCs', 'Soot', 'Noise'], illustrativeAQI: 'Unhealthy (160)', lat: 16.5100, lng: 80.6000 },
      { name: 'Bus Stand Area (Vijayawada)', description: 'High concentration of diesel vehicles, constant idling, and significant noise pollution.', pollutants: ['PM10', 'CO', 'Noise', 'Soot'], illustrativeAQI: 'Moderate (90)', lat: 16.5193, lng: 80.6270 },
      { name: 'Prakasam Barrage Backwaters', description: 'Urban runoff, untreated sewage, and industrial discharge, severely affecting water quality.', pollutants: ['Fecal Coliform', 'Nutrients', 'Organic Pollutants', 'Heavy Metals (water)'], illustrativeAQI: 'Water Quality Alert', lat: 16.50, lng: 80.61 },
      { name: 'Construction Sites (Vijayawada)', description: 'Dust from ongoing construction activities, affecting air quality in surrounding areas.', pollutants: ['PM10', 'Construction Dust', 'Noise'], illustrativeAQI: 'Local Impact', lat: 16.52, lng: 80.63 },
      { name: 'Bandar Road (Vijayawada)', description: 'High vehicular emissions from heavy traffic in a commercial hub.', pollutants: ['PM2.5', 'NOx', 'CO'], illustrativeAQI: 'Unhealthy (145)', lat: 16.51, lng: 80.62 },
      { name: 'Vijayawada Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to air and soil contamination.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 16.50, lng: 80.65 },
    ],
    traffic: [
      { name: 'Eluru Road (Vijayawada)', description: 'Main commercial street, constant congestion, high pedestrian activity, and on-street parking.', peakHours: '9-11 AM, 6-8 PM', causes: ['Commercial activity', 'On-street parking', 'Street vendors', 'Pedestrian jaywalking', 'High vehicle density'], lat: 16.5180, lng: 80.6150 },
      { name: 'Kandrika Bridge (Vijayawada)', description: 'Connects city parts, narrow choke point, high vehicle volume, and frequent bottlenecks.', peakHours: 'Morning & Evening Commute', causes: ['Limited lanes', 'High vehicle volume', 'Merging traffic', 'Signal delays', 'Improper lane usage'], lat: 16.5100, lng: 80.6400 },
      { name: 'Bhavanipuram Area', description: 'Mixed residential and commercial, narrow roads, illegal parking, and local commerce causing congestion.', peakHours: 'Evenings', causes: ['Narrow roads', 'Illegal parking', 'Local commerce', 'Pedestrian movement', 'Unorganized auto stands'], lat: 16.51, lng: 80.62 },
      { name: 'MG Road (Vijayawada)', description: 'Major city artery, connects to various commercial and government areas, high traffic flow.', peakHours: 'Office hours', causes: ['High vehicle density', 'Signal coordination issues', 'Turning conflicts', 'Lack of dedicated lanes'], lat: 16.50, lng: 80.63 },
      { name: 'Ramavarappadu Junction', description: 'Connects Ring Road to city, high speed merging traffic, and frequent bottlenecks.', peakHours: 'Peak Commuting Hours', causes: ['Merging traffic', 'High speed vehicles', 'Signal delays', 'Lane indiscipline'], lat: 16.54, lng: 80.66 },
      { name: 'Gollapudi Industrial Area Road', description: 'Heavy truck traffic to industrial units, sometimes poor road conditions, and slow-moving vehicles.', peakHours: 'Daytime', causes: ['Industrial traffic', 'Heavy vehicle movement', 'Poor road surface', 'Overloading'], lat: 16.55, lng: 80.55 },
    ],
    recommendations: { general: ["Develop more flyovers and underpasses to ease congestion.", "Promote public transport and non-motorized transport (cycling, walking).", "Implement smart city solutions for traffic and waste management."], specific: { accidents: ["Enforce speed limits strictly on Ring Road and highways.", "Install traffic cameras and improve signal coordination at major intersections.", "Improve pedestrian infrastructure and awareness campaigns.", "Conduct regular road safety audits for urban roads."], pollution: ["Regular vehicle emission checks and promotion of electric vehicles.", "Improve waste management in industrial zones and urban areas.", "Invest in sewage treatment plants to clean water bodies.", "Control dust from construction sites."], traffic: ["Implement smart parking solutions and strict parking enforcement.", "Develop dedicated bus lanes and improve public transport frequency.", "Optimize traffic signal timings and improve road network design.", "Manage truck movement and create bypasses for heavy vehicles."] } }
  },
  "Krishna": {
    accidents: [
      { name: 'Machilipatnam-Vijayawada Highway', description: 'State highway, fast traffic, frequent head-on collisions and improper overtaking.', causes: ['Overspeeding', 'Lack of dividers', 'Drunk driving', 'Improper overtaking', 'Poor visibility'], lat: 16.20, lng: 81.00 },
      { name: 'Gudivada Bypass', description: 'Town bypass, agricultural vehicle entry, sudden turns, and animal crossing.', causes: ['Unmarked turns', 'Animal crossing', 'Overloading', 'Lack of clear signage'], lat: 16.44, lng: 80.99 },
      { name: 'Nuzvid-Eluru Road', description: 'Rural highway, mixed traffic, sometimes unlit, and poor road surface.', causes: ['Poor road surface', 'Unmarked junctions', 'Driver fatigue', 'Lack of reflective markers'], lat: 16.77, lng: 80.87 },
      { name: 'Pedana Road', description: 'Connects to textile industry, heavy vehicle movement, and blind spots.', causes: ['Truck accidents', 'Lane indiscipline', 'Blind spots', 'Overloading'], lat: 16.27, lng: 81.17 },
      { name: 'Kaikaluru-Eluru Road', description: 'State highway, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 16.58, lng: 81.25 },
    ],
    pollution: [
      { name: 'Machilipatnam Port Surroundings', description: 'Port operations, shipping emissions, coal handling dust, and oil spills affecting coastal water.', pollutants: ['PM10', 'Oil Spills (water)', 'SOx', 'Heavy Metals (water)', 'Coal Dust'], illustrativeAQI: 'Unhealthy (130)', lat: 16.18, lng: 81.13 },
      { name: 'Sugar Mills Area (Gudivada)', description: 'Emissions from sugar factories, wastewater discharge, and localized air pollution.', pollutants: ['Particulate Matter', 'Sulphur Dioxide', 'Wastewater', 'Odour'], illustrativeAQI: 'Moderate (110)', lat: 16.40, lng: 80.80 },
      { name: 'Krishna River Stretch (Urban)', description: 'Receives urban sewage and agricultural runoff, affecting water quality and aquatic life.', pollutants: ['Fecal Coliform', 'Pesticide Residues', 'Nutrients', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 16.25, lng: 80.90 },
      { name: 'Textile Units (Pedana)', description: 'Discharge of dyes and chemicals into local water bodies, causing water contamination.', pollutants: ['Dyes', 'Chemicals (water)', 'Wastewater'], illustrativeAQI: 'Water Contamination Risk', lat: 16.27, lng: 81.17 },
      { name: 'Vijayawada-Machilipatnam Highway (Air)', description: 'High vehicular emissions from heavy traffic in a commercial hub.', pollutants: ['PM2.5', 'NOx', 'CO'], illustrativeAQI: 'Moderate (95)', lat: 16.30, lng: 80.80 },
    ],
    traffic: [
      { name: 'Machilipatnam Old Town', description: 'Narrow streets, dense population, high pedestrian activity, and unorganized parking causing severe congestion.', peakHours: 'Evenings, Market Days', causes: ['Old city layout', 'Pedestrian movement', 'Unorganized parking', 'Street vendors', 'Narrow roads'], lat: 16.18, lng: 81.13 },
      { name: 'Nuzvid Town Center', description: 'Market area, local traffic, often congested due to commercial activity and lack of designated parking.', peakHours: 'Afternoons', causes: ['Commercial activity', 'Poor road condition', 'Lack of designated parking', 'Slow-moving vehicles'], lat: 16.77, lng: 80.87 },
      { name: 'Gudivada Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 16.44, lng: 80.99 },
      { name: 'Avanigadda Main Road', description: 'Connects to coastal areas, mixed traffic, sometimes narrow sections, and slow-moving vehicles.', peakHours: 'Evening', causes: ['Local commerce', 'Narrow roads', 'Slow-moving vehicles', 'Unorganized parking'], lat: 15.89, lng: 80.80 },
      { name: 'Jaggayyapet Town Center', description: 'Commercial hub, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Afternoons', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 16.89, lng: 80.09 },
    ],
    recommendations: { general: ["Develop better road infrastructure and public transport.", "Regulate industrial and agricultural pollution.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Improve road signage and markings on highways.", "Implement traffic calming measures on bypass roads.", "Enforce speed limits and conduct road safety audits.", "Control overloading of trucks and improve road conditions."], pollution: ["Regulate industrial emissions and wastewater treatment.", "Promote sustainable agricultural practices and reduce pesticide use.", "Monitor water quality in rivers and coastal areas.", "Support green initiatives in industrial zones."], traffic: ["Optimize town center traffic flow and parking.", "Develop dedicated bus stops and auto stands.", "Improve road widening in congested areas.", "Manage truck movement and create bypasses for heavy vehicles."] } }
  },
  "Palnadu": {
    accidents: [
      { name: 'Narasaraopet Bypass', description: 'Newly developed bypass, high speed, often used for shortcuts, leading to unexpected entries.', causes: ['Overspeeding', 'Lack of proper lighting', 'Unmarked access points', 'Improper merging'], lat: 16.22, lng: 80.05 },
      { name: 'Macherla-Nagarjuna Sagar Road', description: 'Rural highway, scenic but winding, prone to vehicle skidding and overturning.', causes: ['Blind spots', 'Lack of barriers', 'Driver inexperience', 'Sharp turns', 'Wet roads'], lat: 16.48, lng: 79.52 },
      { name: 'Gurazala Road', description: 'Connects to mining areas, heavy truck traffic, uneven road surface, and poor visibility.', causes: ['Overloading', 'Potholes', 'Poor visibility', 'Driver fatigue', 'Unmarked turns'], lat: 16.58, lng: 79.78 },
      { name: 'Vinukonda-Guntur Road', description: 'State highway, mixed traffic, sometimes unlit, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Unmarked junctions', 'Lack of reflective markers'], lat: 16.05, lng: 79.90 },
      { name: 'Piduguralla-Macherla Road', description: 'Connects to cement factories, heavy truck traffic, and sometimes narrow sections.', causes: ['Narrow roads', 'Overloading', 'Blind spots', 'Unsafe overtaking'], lat: 16.40, lng: 79.70 },
    ],
    pollution: [
      { name: 'Palnadu Quarrying Areas', description: 'Dust from stone crushing units, noise pollution, and environmental degradation.', pollutants: ['PM10', 'Silica Dust', 'Noise', 'Soil Erosion'], illustrativeAQI: 'Unhealthy (170)', lat: 16.25, lng: 79.70 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates (water)', 'Soil Contamination'], illustrativeAQI: 'Water Contamination Risk', lat: 16.30, lng: 79.80 },
      { name: 'Narasaraopet Urban Area', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Dioxins'], illustrativeAQI: 'Moderate (100)', lat: 16.22, lng: 80.05 },
      { name: 'Cement Factories (near Piduguralla)', description: 'Dust emissions from cement production, high particulate matter, and air pollution.', pollutants: ['PM10', 'Cement Dust', 'SO2', 'NOx'], illustrativeAQI: 'Unhealthy (190)', lat: 16.48, lng: 79.88 },
      { name: 'Guntur Canal (Palnadu Branch)', description: 'Receives agricultural runoff and domestic waste, affecting water quality.', pollutants: ['Nutrients', 'Algae Bloom', 'Fecal Coliform'], illustrativeAQI: 'Water Quality Risk', lat: 16.35, lng: 80.00 },
    ],
    traffic: [
      { name: 'Narasaraopet Town Center', description: 'Agricultural market, commercial hub, high vehicle and pedestrian density, and unorganized parking.', peakHours: 'Morning & Evenings, Market Days', causes: ['Farm vehicle movement', 'Market congestion', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking'], lat: 16.22, lng: 80.05 },
      { name: 'Macherla Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 16.48, lng: 79.52 },
      { name: 'Gurazala Main Road', description: 'Town center, market area, mixed traffic, and lack of designated parking.', peakHours: 'Afternoons', causes: ['Local commerce', 'Poor road discipline', 'Lack of designated parking', 'Slow-moving vehicles'], lat: 16.58, lng: 79.78 },
      { name: 'Sattenapalli Junction', description: 'Crossroad connecting multiple towns, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 16.30, lng: 80.17 },
      { name: 'Vinukonda Town Center', description: 'Commercial and administrative hub, mixed traffic, and frequent bottlenecks.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 16.05, lng: 79.90 },
    ],
    recommendations: { general: ["Implement dust control measures for quarrying and agriculture.", "Enhance road safety infrastructure and enforcement.", "Improve urban planning and traffic management."], specific: { accidents: ["Enhance road safety infrastructure and signage on bypass roads.", "Implement speed limits and enforce safe driving practices on rural highways.", "Improve road conditions and lighting.", "Conduct regular road safety audits for mining roads."], pollution: ["Regulate quarry dust emissions strictly and promote green technologies.", "Promote organic farming and reduce pesticide use.", "Improve urban waste management and discourage open burning.", "Enforce pollution control norms for cement factories."], traffic: ["Manage agricultural market traffic effectively with designated parking.", "Develop dedicated bus stops and auto stands.", "Optimize traffic signal timings at key intersections.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "Guntur": {
    accidents: [
      { name: 'Guntur Inner Ring Road', description: 'High-speed urban corridor, frequent lane changes, and uncontrolled access points leading to collisions.', causes: ['Overspeeding', 'Lane indiscipline', 'Illegal median cuts', 'Lack of pedestrian crossings', 'Improper merging'], lat: 16.30, lng: 80.45 },
      { name: 'Ponnur Road', description: 'Rural highway stretch, mixed traffic, unlit sections, and animal crossing.', causes: ['Drunk driving', 'Animal hazards', 'Poor road lighting', 'Unmarked turns', 'Lack of reflective markers'], lat: 16.10, lng: 80.30 },
      { name: 'Mangalagiri Bypass', description: 'National Highway section, high traffic volume, frequent rear-end collisions, and improper U-turns.', causes: ['High speed', 'Improper U-turns', 'Driver fatigue', 'Lack of proper signage', 'Lane cutting'], lat: 16.43, lng: 80.55 },
      { name: 'Narasaraopet Road Junction', description: 'Busy intersection, connects to agricultural areas, heavy vehicle movement, and blind spots.', causes: ['Signal jumping', 'Overloading', 'Blind spots', 'Lack of clear signage', 'Improper turns'], lat: 16.25, lng: 80.20 },
      { name: 'Tenali Road', description: 'Connects to a major commercial town, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 16.28, lng: 80.60 },
    ],
    pollution: [
      { name: 'Guntur Industrial Area', description: 'Tobacco processing units, textile industries, and other small manufacturing. Air and water pollution from emissions and discharge.', pollutants: ['PM2.5', 'VOCs', 'Soot', 'Wastewater', 'Odour'], illustrativeAQI: 'Unhealthy (140)', lat: 16.30, lng: 80.40 },
      { name: 'Guntur Urban Center', description: 'Vehicular emissions, construction dust, and open waste burning in residential areas.', pollutants: ['PM10', 'NOx', 'Dioxins', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (110)', lat: 16.30, lng: 80.45 },
      { name: 'Repalle Road (Agricultural Runoff)', description: 'Agricultural runoff (pesticides, fertilizers) and domestic sewage discharge, affecting water quality in canals.', pollutants: ['Pesticides', 'Nitrates', 'Fecal Coliform', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 16.00, lng: 80.80 },
      { name: 'Amaravati Capital Region (Construction Dust)', description: 'Significant dust pollution from ongoing large-scale construction activities.', pollutants: ['PM10', 'Construction Dust', 'Noise'], illustrativeAQI: 'Unhealthy (150)', lat: 16.48, lng: 80.35 },
      { name: 'Guntur Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to air and soil contamination.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 16.31, lng: 80.46 },
    ],
    traffic: [
      { name: 'Lalpuram Junction (Guntur)', description: 'Major city intersection, high vehicle volume, multiple merging points, and signal congestion.', peakHours: 'Peak commuting hours (8-10 AM, 5-7 PM)', causes: ['Signal congestion', 'Lane cutting', 'Illegal U-turns', 'High vehicle density', 'Multiple merging roads'], lat: 16.30, lng: 80.45 },
      { name: 'RTC Complex Area (Guntur)', description: 'Public transport hub, constant movement of buses, autos, and pedestrians, leading to severe congestion.', peakHours: 'All day', causes: ['Bus movement', 'Pedestrian crossing', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 16.30, lng: 80.45 },
      { name: 'Arundelpet Main Road', description: 'Commercial and residential mix, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Local commerce'], lat: 16.30, lng: 80.45 },
      { name: 'Amaravati Road (Guntur side)', description: 'Increased traffic due to capital region development, heavy vehicle movement, and sometimes bottlenecks.', peakHours: 'Daytime', causes: ['Construction traffic', 'Heavy vehicle movement', 'Merging traffic', 'Lack of dedicated lanes'], lat: 16.35, lng: 80.40 },
      { name: 'Tenali Town Center', description: 'Commercial hub, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Afternoons', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 16.23, lng: 80.64 },
    ],
    recommendations: { general: ["Promote public transport and non-motorized transport (cycling, walking) to reduce vehicular traffic.", "Strict monitoring of industrial emissions and comprehensive waste management.", "Implement smart traffic management systems and urban planning."], specific: { accidents: ["Install traffic cameras and enforce signal adherence at major junctions.", "Improve pedestrian infrastructure and lighting on inner ring roads.", "Conduct regular road safety audits and improve road conditions on rural roads.", "Implement speed calming measures in urban areas."], pollution: ["Implement stricter emission controls for industries and construction sites.", "Launch public awareness campaigns on waste segregation and discourage open burning.", "Promote organic farming to reduce agricultural runoff.", "Invest in sewage treatment plants and monitor canal water quality regularly."], traffic: ["Optimize traffic signals at Lalpuram Junction and other major intersections.", "Enforce parking rules on commercial roads and develop dedicated parking facilities.", "Regulate bus and auto movement around RTC Complex.", "Develop alternative routes and improve road infrastructure for capital region traffic."] } }
  },
  "Bapatla": {
    accidents: [
      { name: 'Chirala-Ongole Road', description: 'Coastal highway, often foggy, high-speed potential, and animal crossing.', causes: ['Low visibility (fog)', 'Overspeeding', 'Animal crossing', 'Unmarked turns', 'Lack of reflective markers'], lat: 15.80, lng: 80.30 },
      { name: 'Bapatla Town Entry', description: 'Rural to urban transition, mixed traffic, sometimes unexpected turns, and lack of clear signage.', causes: ['Unmarked turns', 'Animal crossing', 'Lack of clear signage', 'Driver negligence'], lat: 15.89, lng: 80.47 },
      { name: 'Repalle Road', description: 'Connects to agricultural areas, mixed vehicle types, often overloaded, and poor road surface.', causes: ['Overloading', 'Poor road surface', 'Drunk driving', 'Unsafe overtaking'], lat: 16.00, lng: 80.80 },
      { name: 'Vetapalem Railway Crossing', description: 'Unmanned or poorly managed railway crossing, high risk of train-vehicle collisions.', causes: ['Lack of awareness', 'Signal jumping', 'Vehicle breakdown on tracks', 'Poor visibility of trains'], lat: 15.78, lng: 80.35 },
      { name: 'Parchur-Chilakaluripet Road', description: 'State highway, moderate traffic, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unmarked junctions', 'Lack of dividers'], lat: 15.90, lng: 80.20 },
    ],
    pollution: [
      { name: 'Coastal Areas (Bapatla)', description: 'Marine plastic pollution, aquaculture waste, affecting beach and sea environment.', pollutants: ['Microplastics', 'Organic Sludge', 'Antibiotics (water)', 'Solid Waste (marine)'], illustrativeAQI: 'Water Quality Alert', lat: 15.80, lng: 80.50 },
      { name: 'Bapatla Urban Area', description: 'Vehicular emissions, domestic waste burning, and aquaculture waste leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (80)', lat: 15.89, lng: 80.47 },
      { name: 'Aquaculture Ponds (Discharge)', description: 'Discharge from shrimp and fish farms affecting local water bodies and ecosystems.', pollutants: ['Nutrients', 'Algae Bloom', 'Organic Waste', 'Antibiotics'], illustrativeAQI: 'Water Quality Risk', lat: 15.95, lng: 80.60 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates', 'Soil Contamination'], illustrativeAQI: 'Soil/Water Contamination Risk', lat: 15.90, lng: 80.40 },
      { name: 'Chirala Textile Units', description: 'Wastewater discharge from textile dyeing and processing, affecting local water bodies.', pollutants: ['Dyes', 'Chemicals (water)', 'Wastewater'], illustrativeAQI: 'Water Contamination Risk', lat: 15.82, lng: 80.35 },
    ],
    traffic: [
      { name: 'Bapatla Beach Road', description: 'Tourist area, weekend congestion, limited parking, and roadside vendors causing obstruction.', peakHours: 'Weekends, Holidays', causes: ['Tourist vehicles', 'Lack of parking', 'Pedestrian movement', 'Roadside vendors', 'Narrow roads'], lat: 15.89, lng: 80.47 },
      { name: 'Chirala Town Center', description: 'Commercial hub, mixed traffic, narrow lanes, and unorganized parking causing congestion.', peakHours: 'Evenings, Market Days', causes: ['Market activity', 'Unorganized parking', 'Narrow lanes', 'Street vendors', 'Auto rickshaw congestion'], lat: 15.82, lng: 80.35 },
      { name: 'Repalle Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 16.00, lng: 80.80 },
      { name: 'Parchur Main Road', description: 'Connects to rural areas, mixed traffic, sometimes creates bottlenecks due to merging traffic.', peakHours: 'Morning', causes: ['Agricultural vehicles', 'Merging traffic', 'Unmarked turns', 'Slow-moving vehicles'], lat: 15.90, lng: 80.20 },
      { name: 'Nizampatnam Port Road', description: 'Connects to a small port, increased truck traffic, sometimes narrow and congested.', peakHours: 'Daytime', causes: ['Port traffic', 'Heavy vehicle movement', 'Narrow roads', 'Overloading'], lat: 15.80, lng: 80.67 },
    ],
    recommendations: { general: ["Promote eco-tourism and sustainable coastal management.", "Improve road safety in foggy conditions and at railway crossings.", "Implement proper waste management and sustainable aquaculture practices."], specific: { accidents: ["Install fog warning systems and reflective signage on coastal highways.", "Improve safety measures at railway crossings.", "Enforce speed limits and conduct road safety audits.", "Improve road conditions and lighting on rural roads."], pollution: ["Organize regular beach cleanups and promote proper waste disposal.", "Regulate aquaculture farm discharge and promote sustainable practices.", "Monitor water quality in coastal areas and agricultural runoff.", "Ensure proper wastewater treatment from textile units."], traffic: ["Provide adequate tourist parking and regulate beachside vendors.", "Manage town center parking and pedestrian flow.", "Develop dedicated bus stops and auto stands.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "Sri Potti Sriramulu Nellore": {
    accidents: [
      { name: 'Nellore Bypass (NH16)', description: 'Busy highway section, high speeds, sometimes uncontrolled crossings and U-turns, frequent rear-end collisions.', causes: ['Overspeeding', 'Driver fatigue', 'Illegal median cuts', 'Lack of proper signage', 'Improper merging'], lat: 14.44, lng: 79.98 },
      { name: 'Kavali-Nellore Road', description: 'State highway, fast traffic, frequent head-on collisions and improper overtaking.', causes: ['Overspeeding', 'Lack of dividers', 'Drunk driving', 'Improper overtaking', 'Poor visibility'], lat: 14.90, lng: 79.90 },
      { name: 'Gudur Road', description: 'Connects to mining areas, heavy truck traffic, uneven road surface, and poor visibility.', causes: ['Overloading', 'Potholes', 'Poor visibility', 'Driver fatigue', 'Unmarked turns'], lat: 14.15, lng: 79.85 },
      { name: 'Krishnapatnam Port Road', description: 'Heavy industrial traffic, poor road conditions in some stretches, and frequent truck accidents.', causes: ['Truck congestion', 'Overloading', 'Potholes', 'Driver fatigue', 'Lack of dedicated lanes'], lat: 14.25, lng: 80.12 },
      { name: 'Venkatachalam-Muthukur Road', description: 'Rural road, mixed traffic, sometimes unlit, and animal crossing.', causes: ['Animal crossing', 'Drunk driving', 'Poor road surface', 'Lack of reflective markers'], lat: 14.30, lng: 80.05 },
    ],
    pollution: [
      { name: 'Nellore Thermal Power Plant Area', description: 'Emissions from coal-fired power plants, high SO2, NOx, and particulate matter in the air.', pollutants: ['SO2', 'NOx', 'PM2.5', 'Fly Ash', 'Heavy Metals (air)'], illustrativeAQI: 'Unhealthy (180)', lat: 14.20, lng: 80.05 },
      { name: 'Penna River Stretch (Urban)', description: 'Receives urban sewage and industrial discharge, severely affecting water quality.', pollutants: ['Fecal Coliform', 'Organic Pollutants', 'Heavy Metals (water)', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 14.44, lng: 79.98 },
      { name: 'Coastal Aquaculture Zones', description: 'Discharge from shrimp farms, affecting water quality and local ecosystems due to antibiotics and organic waste.', pollutants: ['Ammonia', 'Organic waste', 'Antibiotics (water)', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 14.20, lng: 80.10 },
      { name: 'Nellore Urban Area', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'PM2.5', 'Dioxins', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (120)', lat: 14.44, lng: 79.98 },
      { name: 'Mines & Quarries (near Gudur)', description: 'Dust from mica and other mining operations, noise pollution, and environmental degradation.', pollutants: ['Silica Dust', 'Particulate Matter', 'Noise', 'Soil Erosion'], illustrativeAQI: 'Hazardous (200)', lat: 14.15, lng: 79.85 },
    ],
    traffic: [
      { name: 'Stonehousepet (Nellore)', description: 'Central commercial area, narrow streets, high footfall, and unorganized parking causing severe congestion.', peakHours: 'Evenings, Market Days', causes: ['Narrow roads', 'On-street parking', 'Street vendors', 'Pedestrian jaywalking', 'High vehicle density'], lat: 14.44, lng: 79.98 },
      { name: 'RTC Bus Stand Area (Nellore)', description: 'Public transport hub, constant movement of buses, autos, and pedestrians, leading to severe congestion.', peakHours: 'All day', causes: ['Bus movement', 'Pedestrian crossing', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 14.44, lng: 79.98 },
      { name: 'Magunta Layout Road', description: 'Residential and commercial mix, high vehicle volume, and sometimes poor signal management.', peakHours: 'Peak Commuting Hours', causes: ['Signal delays', 'Lane cutting', 'High private vehicle density', 'Turning conflicts'], lat: 14.45, lng: 79.97 },
      { name: 'Krishnapatnam Port Entry', description: 'Extremely heavy truck traffic, often creates bottlenecks due to vehicle checks and lane merging.', peakHours: 'Daytime', causes: ['Truck congestion', 'Vehicle checks', 'Lane merging', 'Congestion', 'Heavy vehicle movement'], lat: 14.25, lng: 80.12 },
      { name: 'Gudur Town Center', description: 'Commercial hub, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Afternoons', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 14.15, lng: 79.85 },
    ],
    recommendations: { general: ["Promote sustainable industrial practices and robust environmental monitoring.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Control overloading of trucks and improve road conditions on port roads.", "Improve lighting and signage on rural roads."], pollution: ["Implement stricter emission controls for power plants and industries.", "Invest in wastewater treatment plants and proper waste disposal systems.", "Monitor water quality in rivers and coastal areas.", "Regulate mining activities and ensure dust suppression."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in city areas.", "Manage heavy vehicle movement and create bypasses for port traffic."] } }
  },
  "Prakasam": {
    accidents: [
      { name: 'Ongole Bypass (NH16)', description: 'Busy highway section, high speeds, sometimes uncontrolled crossings and U-turns, frequent rear-end collisions.', causes: ['Overspeeding', 'Driver fatigue', 'Illegal median cuts', 'Lack of proper signage', 'Improper merging'], lat: 15.50, lng: 80.05 },
      { name: 'Markapur Road', description: 'Connects to interior areas, often unlit, mixed heavy and light vehicles, animal crossing, and uneven road surface.', causes: ['Animal crossing', 'Drunk driving', 'Poor visibility at night', 'Uneven road surface', 'Unmarked turns'], lat: 15.75, lng: 79.28 },
      { name: 'Chirala-Addanki Road', description: 'State highway, moderate to high speed, rural settlements along the road, unmarked junctions, and two-wheeler accidents.', causes: ['Unmarked junctions', 'Pedestrian crossing', 'Two-wheeler accidents', 'Lack of lane discipline', 'Overspeeding'], lat: 15.80, lng: 80.30 },
      { name: 'Giddalur Ghat Road', description: 'Hilly terrain, sharp curves, prone to vehicle overturning and skidding, especially during monsoons.', causes: ['Driver error', 'Brake failure', 'Overloading', 'Lack of guardrails', 'Wet roads'], lat: 15.38, lng: 78.92 },
      { name: 'Kandukur-Nellore Road', description: 'State highway, high speed, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unsafe overtaking', 'Lack of dividers'], lat: 15.22, lng: 80.12 },
    ],
    pollution: [
      { name: 'Ongole Stone Crushing Units', description: 'Dust and noise pollution from numerous quarries and stone crushing plants, affecting air quality and health.', pollutants: ['PM10', 'PM2.5', 'Silica Dust', 'Noise', 'Respiratory Irritants'], illustrativeAQI: 'Unhealthy (180)', lat: 15.52, lng: 80.04 },
      { name: 'Tobacco Cultivation Areas', description: 'Pesticide use, stubble burning in agricultural fields, affecting air, soil, and water.', pollutants: ['Pesticide Residues', 'Smoke', 'GHGs', 'Soil Contamination', 'Nitrates (water)'], illustrativeAQI: 'Air/Soil Quality Alert', lat: 15.50, lng: 79.50 },
      { name: 'Coastal Areas (near Ongole)', description: 'Plastic pollution, waste from fishing activities, and marine debris affecting coastal ecosystems.', pollutants: ['Microplastics', 'Solid Waste (marine)', 'Oil (from boats)', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 15.52, lng: 80.07 },
      { name: 'Ongole Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Dioxins', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (120)', lat: 15.50, lng: 80.05 },
      { name: 'Singarayakonda Industrial Area', description: 'Small-scale industries, sometimes with inadequate pollution control measures.', pollutants: ['Particulates', 'Odour', 'Wastewater'], illustrativeAQI: 'Moderate (90)', lat: 15.30, lng: 80.00 },
    ],
    traffic: [
      { name: 'Ongole Town Center', description: 'Main market and commercial area, high footfall and vehicle density, and unorganized parking causing severe congestion.', peakHours: 'Evenings, particularly weekends', causes: ['Congested roads', 'On-street parking', 'Unauthorized vendors', 'Pedestrian jaywalking', 'High vehicle density'], lat: 15.50, lng: 80.05 },
      { name: 'Kanigiri Main Road', description: 'Busy town road, mixed traffic including auto-rickshaws and bikes, and lack of designated parking.', peakHours: 'Afternoons', causes: ['Local commerce', 'Poor road discipline', 'Lack of designated parking', 'Slow-moving vehicles', 'Auto rickshaw congestion'], lat: 15.42, lng: 79.62 },
      { name: 'Darsi Junction', description: 'Crossroad connecting multiple state roads, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Morning & Evening peak', causes: ['Merging traffic', 'Signal delays', 'Overlapping turns', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 15.75, lng: 79.68 },
      { name: 'Markapur Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'All day', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 15.75, lng: 79.28 },
      { name: 'Chirala Town Center', description: 'Commercial hub, mixed traffic, narrow lanes, and frequent bottlenecks due to market activity.', peakHours: 'Evenings', causes: ['Market activity', 'Unorganized parking', 'Narrow lanes', 'Street vendors'], lat: 15.82, lng: 80.35 },
    ],
    recommendations: { general: ["Promote sustainable agricultural and industrial practices.", "Enhance road safety infrastructure and enforcement.", "Improve waste management and coastal protection."], specific: { accidents: ["Install clear warning signs and rumble strips on highways.", "Improve road lighting and clear vegetation on rural stretches.", "Implement traffic calming measures at busy junctions and enforce speed limits.", "Conduct regular road safety audits for mining roads."], pollution: ["Regulate quarry dust emissions strictly and promote green technologies.", "Encourage responsible agricultural practices and reduce stubble burning.", "Organize regular beach cleanups and promote proper waste disposal.", "Enforce pollution control norms for industrial units."], traffic: ["Improve traffic management in Ongole town and develop designated parking zones.", "Optimize traffic signal timings and flow at major junctions.", "Develop dedicated bus stops and auto stands.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "Kurnool": {
    accidents: [
      { name: 'Kurnool-Nandyal Highway (NH40)', description: 'State highway, frequent collisions, high speed, and lack of median barriers.', causes: ['Overspeeding', 'Lack of median barriers', 'Driver fatigue', 'Improper overtaking', 'Poor visibility'], lat: 15.80, lng: 78.05 },
      { name: 'Panyam Road', description: 'Rural stretch with sharp turns and uneven surfaces, poor visibility at night, and animal crossing.', causes: ['Driver error', 'Poor visibility at night', 'Overloading', 'Unmarked turns', 'Animal hazards'], lat: 15.63, lng: 78.20 },
      { name: 'Adoni Road', description: 'Connects to a major agricultural town, heavy truck traffic, sometimes unlit, and potholes.', causes: ['Unsafe overtaking', 'Animal crossing', 'Drunk driving', 'Potholes', 'Heavy vehicle movement'], lat: 15.53, lng: 77.28 },
      { name: 'Srisailam Ghat Road', description: 'Pilgrim route, winding hill road, steep slopes, prone to vehicle skidding and brake failure.', causes: ['Brake failure', 'Over-speeding on turns', 'Driver inexperience', 'Lack of guardrails', 'Wet roads'], lat: 16.08, lng: 78.86 },
      { name: 'Yemmiganur-Bellary Road', description: 'Interstate road, high speed, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unmarked junctions', 'Lack of dividers'], lat: 15.80, lng: 77.40 },
    ],
    pollution: [
      { name: 'Kurnool Industrial Estate (Gudur area)', description: 'Cement factories, pharmaceutical units, other heavy industries. High air pollution (PM2.5, NOx, SO2, fly ash).', pollutants: ['PM2.5', 'NOx', 'SO2', 'Heavy Metals', 'Fly Ash'], illustrativeAQI: 'Unhealthy (175)', lat: 15.80, lng: 78.00 },
      { name: 'Hundri River Stretch', description: 'Receives urban and industrial discharge, severely affecting water quality.', pollutants: ['Untreated Sewage', 'Industrial Effluents', 'E.coli', 'Heavy Metals (water)', 'Organic Waste'], illustrativeAQI: 'Water Quality Alert', lat: 15.82, lng: 78.03 },
      { name: 'Urban Residential Areas', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'PM2.5', 'VOCs', 'Soot', 'Dioxins'], illustrativeAQI: 'Moderate (120)', lat: 15.81, lng: 78.04 },
      { name: 'Mining Areas (near Bethamcherla)', description: 'Dust from limestone and other mining operations, noise pollution, and environmental degradation.', pollutants: ['Silica Dust', 'Particulate Matter', 'Noise', 'Soil Erosion'], illustrativeAQI: 'Hazardous (200)', lat: 15.45, lng: 78.15 },
      { name: 'Kurnool Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 15.81, lng: 78.05 },
    ],
    traffic: [
      { name: 'Raj Vihar Circle (Kurnool)', description: 'Major city intersection, high vehicle volume, multiple merging points, and signal congestion.', peakHours: 'Peak commuting hours (8-10 AM, 5-7 PM)', causes: ['Signal congestion', 'Lane cutting', 'Illegal U-turns', 'High vehicle density', 'Multiple merging roads'], lat: 15.82, lng: 78.04 },
      { name: 'Bus Stand Area (Kurnool)', description: 'Public transport hub, constant movement of buses, autos, and pedestrians, leading to severe congestion.', peakHours: 'All day', causes: ['Bus movement', 'Pedestrian crossing', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 15.81, lng: 78.04 },
      { name: 'Nandyal Check Post', description: 'Entry/exit point for traffic, often creates bottlenecks due to vehicle checks and lane merging.', peakHours: 'Weekends, festival times', causes: ['Vehicle checks', 'Lane merging', 'Congestion', 'Heavy vehicle movement'], lat: 15.83, lng: 78.05 },
      { name: 'Old City Area (Kurnool)', description: 'Narrow streets, dense population, mixed traffic, and unorganized parking causing congestion.', peakHours: 'Evenings', causes: ['Narrow roads', 'Unorganized parking', 'Local commerce', 'Pedestrian movement'], lat: 15.82, lng: 78.03 },
      { name: 'Bellary Road Junction', description: 'Major intersection, high traffic volume, and sometimes poor signal management.', peakHours: 'Peak Commuting Hours', causes: ['Signal delays', 'Lane cutting', 'High private vehicle density', 'Turning conflicts'], lat: 15.83, lng: 78.02 },
    ],
    recommendations: { general: ["Promote industrial environmental compliance and sustainable waste management.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety checks for pilgrim buses on ghat roads.", "Improve road conditions and lighting on rural roads."], pollution: ["Invest in wastewater treatment plants and proper waste disposal systems.", "Control emissions from industrial areas and mining operations.", "Promote green technologies in industries.", "Discourage open burning of waste."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in old city areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Nandyal": {
    accidents: [
      { name: 'Nandyal Bypass (NH40)', description: 'High-speed highway, frequent rear-end collisions and lane cutting.', causes: ['Overspeeding', 'Lack of service roads', 'Sudden braking', 'Improper merging'], lat: 15.48, lng: 78.48 },
      { name: 'Allagadda Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 15.15, lng: 78.50 },
      { name: 'Atmakur Road', description: 'Connects to forest areas, winding roads, sometimes unlit, and animal crossing.', causes: ['Driver error', 'Animal hazards', 'Poor visibility', 'Lack of guardrails'], lat: 15.90, lng: 78.60 },
      { name: 'Banganapalle Road', description: 'Connects to mining areas, heavy truck traffic, uneven road surface, and poor visibility.', causes: ['Overloading', 'Potholes', 'Poor visibility', 'Driver fatigue'], lat: 15.30, lng: 78.20 },
      { name: 'Srisailam Highway (Nandyal stretch)', description: 'Pilgrim route, winding roads, steep slopes, prone to vehicle skidding and brake failure.', causes: ['Brake failure', 'Over-speeding on turns', 'Driver inexperience', 'Lack of guardrails'], lat: 15.80, lng: 78.80 },
    ],
    pollution: [
      { name: 'Nandyal Industrial Area', description: 'Cement factories, other industries, high air pollution (PM2.5, NOx, SO2, fly ash).', pollutants: ['PM2.5', 'NOx', 'SO2', 'Heavy Metals', 'Fly Ash'], illustrativeAQI: 'Unhealthy (160)', lat: 15.48, lng: 78.48 },
      { name: 'Kunderu River Stretch', description: 'Receives urban and industrial discharge, severely affecting water quality.', pollutants: ['Untreated Sewage', 'Industrial Effluents', 'E.coli', 'Heavy Metals (water)'], illustrativeAQI: 'Water Quality Alert', lat: 15.40, lng: 78.40 },
      { name: 'Urban Residential Areas', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'PM2.5', 'VOCs', 'Soot'], illustrativeAQI: 'Moderate (110)', lat: 15.48, lng: 78.48 },
      { name: 'Stone Quarries (near Banganapalle)', description: 'Dust from limestone and other mining operations, noise pollution, and environmental degradation.', pollutants: ['Silica Dust', 'Particulate Matter', 'Noise', 'Soil Erosion'], illustrativeAQI: 'Hazardous (190)', lat: 15.30, lng: 78.20 },
      { name: 'Nandyal Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, leading to localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 15.49, lng: 78.49 },
    ],
    traffic: [
      { name: 'Nandyal Town Center', description: 'Commercial hub, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 15.48, lng: 78.48 },
      { name: 'RTC Bus Stand Area (Nandyal)', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 15.48, lng: 78.48 },
      { name: 'Srisailam Pilgrim Route Entry', description: 'High traffic during festival seasons and weekends, limited parking, and slow-moving pilgrim vehicles.', peakHours: 'Festival days, Weekends', causes: ['Pilgrim movement', 'Limited parking', 'Roadside stalls', 'Bus congestion'], lat: 15.80, lng: 78.80 },
      { name: 'Giddalur Road Junction', description: 'Crossroad connecting multiple towns, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 15.38, lng: 78.92 },
      { name: 'Koilkuntla Main Road', description: 'Town center, market area, mixed traffic, and frequent bottlenecks.', peakHours: 'Afternoons', causes: ['Local commerce', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 15.13, lng: 78.29 },
    ],
    recommendations: { general: ["Promote industrial environmental compliance and sustainable waste management.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety checks for pilgrim buses on ghat roads.", "Improve road conditions and lighting on rural roads."], pollution: ["Invest in wastewater treatment plants and proper waste disposal systems.", "Control emissions from industrial areas and mining operations.", "Promote green technologies in industries.", "Discourage open burning of waste."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in old city areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Anantapuramu": {
    accidents: [
      { name: 'Anantapur Bypass (NH44)', description: 'High-speed highway, frequent rear-end collisions and lane cutting.', causes: ['Overspeeding', 'Lack of service roads', 'Sudden braking', 'Improper merging'], lat: 14.67, lng: 77.60 },
      { name: 'Gooty Road', description: 'Connects to major industrial town, heavy truck traffic, sometimes unlit, and potholes.', causes: ['Unsafe overtaking', 'Animal crossing', 'Drunk driving', 'Potholes', 'Heavy vehicle movement'], lat: 15.12, lng: 77.63 },
      { name: 'Dharmavaram Road', description: 'Connects to textile industry, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 14.45, lng: 77.72 },
      { name: 'Kadiri Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 14.12, lng: 78.15 },
      { name: 'Hindupur-Bengaluru Road', description: 'Interstate road, high speed, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unmarked junctions', 'Lack of dividers'], lat: 13.90, lng: 77.50 },
    ],
    pollution: [
      { name: 'Anantapur Industrial Estate', description: 'Textile units, other industries, air and water pollution from emissions and discharge.', pollutants: ['PM2.5', 'Dyes', 'VOCs', 'Wastewater'], illustrativeAQI: 'Moderate (110)', lat: 14.67, lng: 77.60 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates (water)', 'Soil Contamination'], illustrativeAQI: 'Water Contamination Risk', lat: 14.50, lng: 77.70 },
      { name: 'Urban Residential Zones', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'NOx', 'Soot', 'Carbon Monoxide'], illustrativeAQI: 'Moderate (95)', lat: 14.67, lng: 77.60 },
      { name: 'Groundwater Depletion Areas', description: 'Over-extraction of groundwater for agriculture and urban use, leading to water scarcity and quality issues.', pollutants: ['Fluoride (natural)', 'Salinity (natural)', 'Water Scarcity'], illustrativeAQI: 'Water Stress', lat: 14.70, lng: 77.55 },
      { name: 'Anantapur Municipal Solid Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 14.68, lng: 77.61 },
    ],
    traffic: [
      { name: 'Anantapur Clock Tower Circle', description: 'Major city intersection, high vehicle volume, multiple merging points, and signal congestion.', peakHours: 'Peak commuting hours (8-10 AM, 5-7 PM)', causes: ['Signal congestion', 'Lane cutting', 'Illegal U-turns', 'High vehicle density', 'Multiple merging roads'], lat: 14.67, lng: 77.60 },
      { name: 'RTC Bus Stand Area (Anantapur)', description: 'Public transport hub, constant movement of buses, autos, and pedestrians, leading to severe congestion.', peakHours: 'All day', causes: ['Bus movement', 'Pedestrian crossing', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 14.67, lng: 77.60 },
      { name: 'Sapthagiri Circle', description: 'Busy intersection, high traffic volume, and sometimes poor signal management.', peakHours: 'Peak Commuting Hours', causes: ['Signal delays', 'Lane cutting', 'High private vehicle density', 'Turning conflicts'], lat: 14.67, lng: 77.61 },
      { name: 'Dharmavaram Town Center', description: 'Commercial hub, mixed traffic, narrow lanes, and frequent bottlenecks due to market activity.', peakHours: 'Evenings', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 14.45, lng: 77.72 },
      { name: 'Gooty Fort Road', description: 'Tourist attraction, increased traffic during weekends, limited parking, and narrow approach roads.', peakHours: 'Weekends', causes: ['Tourist vehicles', 'Limited parking', 'Narrow roads', 'Slow-moving traffic'], lat: 15.12, lng: 77.63 },
    ],
    recommendations: { general: ["Promote sustainable water management and agricultural practices.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Improve road conditions and lighting on rural roads.", "Conduct regular safety audits for industrial roads."], pollution: ["Implement stricter industrial emission norms and wastewater treatment for textile units.", "Promote organic farming and reduce pesticide use.", "Invest in rainwater harvesting and groundwater recharge.", "Improve urban waste management and discourage open burning."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in city areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Sri Sathya Sai": {
    accidents: [
      { name: 'Puttaparthi Bypass', description: 'New road, high speed potential, sometimes used by locals for shortcuts, leading to unexpected entries.', causes: ['Overspeeding', 'Unmarked access points', 'Animal crossing', 'Lack of proper lighting'], lat: 14.16, lng: 77.77 },
      { name: 'Dharmavaram-Puttaparthi Road', description: 'State highway, moderate traffic, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unsafe overtaking', 'Lack of dividers'], lat: 14.30, lng: 77.70 },
      { name: 'Kadiri Road (Sri Sathya Sai)', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 14.12, lng: 78.15 },
      { name: 'Penukonda Fort Road', description: 'Tourist route, winding roads, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow roads', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 14.07, lng: 77.59 },
      { name: 'Bukkapatnam Lake Road', description: 'Scenic route, sometimes narrow, high speed potential, and animal crossing.', causes: ['Overspeeding', 'Animal hazards', 'Lack of guardrails', 'Unmarked turns'], lat: 14.20, lng: 77.70 },
    ],
    pollution: [
      { name: 'Puttaparthi Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Good (70)', lat: 14.16, lng: 77.77 },
      { name: 'Chitravathi River Stretch', description: 'Receives urban runoff and domestic waste, affecting water quality, especially downstream of settlements.', pollutants: ['Organic Waste', 'Fecal Coliform', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 14.10, lng: 77.70 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates', 'Soil Contamination'], illustrativeAQI: 'Soil/Water Contamination Risk', lat: 14.25, lng: 77.80 },
      { name: 'Local Markets (Waste)', description: 'Improper disposal of organic and plastic waste in open areas, leading to localized pollution.', pollutants: ['Odour', 'Methane', 'Plastic Waste'], illustrativeAQI: 'Local Impact', lat: 14.16, lng: 77.77 },
      { name: 'Penukonda Industrial Area (Proposed/Small Scale)', description: 'Potential for localized air and water pollution from small-scale industries (if any).', pollutants: ['Particulates', 'VOCs', 'Wastewater'], illustrativeAQI: 'Moderate (80)', lat: 14.07, lng: 77.59 },
    ],
    traffic: [
      { name: 'Prasanthi Nilayam Entrance', description: 'Pilgrim hub, constant bus and private vehicle movement, and pedestrian crossings leading to severe congestion.', peakHours: 'All day, especially during festivals', causes: ['Pilgrim movement', 'Bus congestion', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 14.16, lng: 77.77 },
      { name: 'Puttaparthi Town Center', description: 'Commercial area, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 14.16, lng: 77.77 },
      { name: 'Dharmavaram Bypass Junction', description: 'Crossroad connecting multiple towns, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 14.45, lng: 77.72 },
      { name: 'Kadiri Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 14.12, lng: 78.15 },
      { name: 'Penukonda Town Center', description: 'Commercial and administrative hub, mixed traffic, and frequent bottlenecks.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 14.07, lng: 77.59 },
    ],
    recommendations: { general: ["Promote sustainable tourism and pilgrimage management.", "Improve road safety and traffic flow around the spiritual center.", "Enhance waste management and water conservation."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on bypass roads.", "Improve road design and signage on state highways.", "Manage pilgrim vehicle movement and provide clear guidance.", "Improve road conditions and lighting on rural roads."], pollution: ["Improve urban waste collection and sewage treatment.", "Promote organic farming and reduce pesticide use.", "Monitor river water quality regularly and prevent illegal dumping.", "Support green initiatives in industrial zones."], traffic: ["Optimize traffic flow and parking around Prasanthi Nilayam.", "Develop dedicated bus stops and auto stands.", "Manage market area parking and pedestrian flow.", "Improve road widening in congested areas and manage truck movement."] } }
  },
  "YSR Kadapa": {
    accidents: [
      { name: 'Kadapa Bypass (NH40)', description: 'High-speed highway, frequent rear-end collisions and lane cutting.', causes: ['Overspeeding', 'Lack of service roads', 'Sudden braking', 'Improper merging'], lat: 14.47, lng: 78.82 },
      { name: 'Pulivendula Road', description: 'Connects to major towns, heavy truck traffic, sometimes unlit, and potholes.', causes: ['Unsafe overtaking', 'Animal crossing', 'Drunk driving', 'Potholes', 'Heavy vehicle movement'], lat: 14.42, lng: 78.23 },
      { name: 'Proddatur Road', description: 'Connects to industrial areas, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 14.77, lng: 78.55 },
      { name: 'Rayachoti Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 14.05, lng: 78.75 },
      { name: 'Jammalamadugu Road', description: 'Connects to cement factories, heavy truck traffic, and sometimes narrow sections.', causes: ['Narrow roads', 'Overloading', 'Blind spots', 'Unsafe overtaking'], lat: 14.83, lng: 78.38 },
    ],
    pollution: [
      { name: 'Kadapa Industrial Area', description: 'Cement factories, other industries, high air pollution (PM2.5, NOx, SO2, fly ash).', pollutants: ['PM2.5', 'NOx', 'SO2', 'Heavy Metals', 'Fly Ash'], illustrativeAQI: 'Unhealthy (170)', lat: 14.47, lng: 78.82 },
      { name: 'Penna River Stretch (Kadapa)', description: 'Receives urban and industrial discharge, severely affecting water quality.', pollutants: ['Untreated Sewage', 'Industrial Effluents', 'E.coli', 'Heavy Metals (water)'], illustrativeAQI: 'Water Quality Alert', lat: 14.40, lng: 78.80 },
      { name: 'Urban Residential Areas', description: 'Vehicular emissions, domestic waste burning, and construction dust contributing to air pollution.', pollutants: ['PM10', 'PM2.5', 'VOCs', 'Soot'], illustrativeAQI: 'Moderate (115)', lat: 14.47, lng: 78.82 },
      { name: 'Mining Areas (near Jammalamadugu)', description: 'Dust from limestone and other mining operations, noise pollution, and environmental degradation.', pollutants: ['Silica Dust', 'Particulate Matter', 'Noise', 'Soil Erosion'], illustrativeAQI: 'Hazardous (190)', lat: 14.83, lng: 78.38 },
      { name: 'Kadapa Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 14.48, lng: 78.83 },
    ],
    traffic: [
      { name: 'Kadapa Town Center (RTC Complex)', description: 'Commercial hub, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 14.47, lng: 78.82 },
      { name: 'Proddatur Main Road', description: 'Commercial area, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Afternoons', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 14.77, lng: 78.55 },
      { name: 'Pulivendula Bypass Junction', description: 'Crossroad connecting multiple towns, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 14.42, lng: 78.23 },
      { name: 'Badvel Road', description: 'Connects to rural areas, mixed traffic, sometimes creates bottlenecks due to merging traffic.', peakHours: 'Morning', causes: ['Agricultural vehicles', 'Merging traffic', 'Unmarked turns', 'Slow-moving vehicles'], lat: 14.75, lng: 79.05 },
      { name: 'Mydukur Town Center', description: 'Commercial and administrative hub, mixed traffic, and frequent bottlenecks.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 14.88, lng: 78.86 },
    ],
    recommendations: { general: ["Promote industrial environmental compliance and sustainable waste management.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety audits for industrial roads.", "Improve road conditions and lighting on rural roads."], pollution: ["Invest in wastewater treatment plants and proper waste disposal systems.", "Control emissions from industrial areas and mining operations.", "Promote green technologies in industries.", "Discourage open burning of waste."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in city areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Annamayya": {
    accidents: [
      { name: 'Rayachoti-Madanapalle Road', description: 'State highway, moderate traffic, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unsafe overtaking', 'Lack of dividers'], lat: 13.90, lng: 78.35 },
      { name: 'Horsley Hills Ghat Road', description: 'Tourist route, winding hill road, steep slopes, prone to vehicle skidding and brake failure.', causes: ['Brake failure', 'Over-speeding on turns', 'Driver inexperience', 'Lack of guardrails'], lat: 13.63, lng: 78.42 },
      { name: 'Rajampet Road', description: 'Connects to major towns, heavy truck traffic, sometimes unlit, and potholes.', causes: ['Unsafe overtaking', 'Animal crossing', 'Drunk driving', 'Potholes', 'Heavy vehicle movement'], lat: 14.05, lng: 79.20 },
      { name: 'Piler Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 13.80, lng: 78.40 },
      { name: 'Chittoor-Annamayya Road', description: 'Inter-district road, high speed, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unmarked junctions', 'Lack of dividers'], lat: 13.50, lng: 78.50 },
    ],
    pollution: [
      { name: 'Madanapalle Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (90)', lat: 13.55, lng: 78.50 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates (water)', 'Soil Contamination'], illustrativeAQI: 'Water Contamination Risk', lat: 13.60, lng: 78.60 },
      { name: 'Horsley Hills Tourist Waste', description: 'Improper disposal of plastic and organic waste by tourists, affecting local environment.', pollutants: ['Plastic Waste', 'Organic Waste', 'Litter'], illustrativeAQI: 'Local Impact', lat: 13.63, lng: 78.42 },
      { name: 'Rayachoti Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 14.05, lng: 78.75 },
      { name: 'Groundwater Depletion Areas', description: 'Over-extraction of groundwater for agriculture and urban use, leading to water scarcity and quality issues.', pollutants: ['Fluoride (natural)', 'Salinity (natural)', 'Water Scarcity'], illustrativeAQI: 'Water Stress', lat: 13.70, lng: 78.45 },
    ],
    traffic: [
      { name: 'Madanapalle Town Center', description: 'Commercial hub, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 13.55, lng: 78.50 },
      { name: 'Rayachoti Bus Stand Area', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 14.05, lng: 78.75 },
      { name: 'Piler Main Road', description: 'Town center, market area, mixed traffic, and frequent bottlenecks.', peakHours: 'Afternoons', causes: ['Local commerce', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 13.80, lng: 78.40 },
      { name: 'Rajampet Junction', description: 'Crossroad connecting multiple towns, often creates bottlenecks due to merging traffic and signal delays.', peakHours: 'Evening', causes: ['Merging traffic', 'Signal delays', 'Heavy vehicle movement', 'Lane indiscipline'], lat: 14.05, lng: 79.20 },
      { name: 'Thamballapalle Road', description: 'Connects to rural areas, mixed traffic, sometimes creates bottlenecks due to merging traffic.', peakHours: 'Morning', causes: ['Agricultural vehicles', 'Merging traffic', 'Unmarked turns', 'Slow-moving vehicles'], lat: 13.70, lng: 78.55 },
    ],
    recommendations: { general: ["Promote sustainable tourism and agricultural practices.", "Enhance road safety and traffic management in hilly and urban areas.", "Improve waste management and water conservation."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on state highways.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety checks for tourist vehicles on ghat roads.", "Improve road conditions and lighting on rural roads."], pollution: ["Improve urban waste collection and sewage treatment.", "Promote organic farming and reduce pesticide use.", "Manage tourist waste effectively in eco-sensitive areas.", "Invest in rainwater harvesting and groundwater recharge."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in town areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Tirupati": {
    accidents: [
      { name: 'Alipiri Road (Tirumala Ghat)', description: 'Pilgrim route, winding hill road, steep slopes, prone to vehicle skidding and brake failure.', causes: ['Brake failure', 'Over-speeding on turns', 'Driver inexperience', 'Lack of guardrails', 'Wet roads'], lat: 13.65, lng: 79.42 },
      { name: 'Renigunta Road', description: 'Connects to airport and industrial areas, fast-moving traffic, frequent U-turn violations, and improper overtaking.', causes: ['Distracted driving', 'U-turn violations', 'Improper overtaking', 'Lack of dividers', 'High speed'], lat: 13.63, lng: 79.48 },
      { name: 'Chandragiri Road', description: 'Connects to historical site, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 13.58, lng: 79.32 },
      { name: 'Srikalahasti Road', description: 'Pilgrim route, high traffic volume, sometimes unlit, and animal crossing.', causes: ['Animal crossing', 'Drunk driving', 'Poor visibility at night', 'Unmarked turns'], lat: 13.75, lng: 79.70 },
      { name: 'Naidupeta-Tirupati Road', description: 'State highway, high speed, sometimes unlit, and sudden turns.', causes: ['Drunk driving', 'Poor visibility', 'Unsafe overtaking', 'Lack of dividers'], lat: 13.80, lng: 79.50 },
    ],
    pollution: [
      { name: 'Tirupati Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (110)', lat: 13.65, lng: 79.42 },
      { name: 'Swarnamukhi River Stretch', description: 'Receives urban runoff and domestic waste, affecting water quality, especially downstream of settlements.', pollutants: ['Organic Waste', 'Fecal Coliform', 'Nutrients'], illustrativeAQI: 'Water Quality Alert', lat: 13.60, lng: 79.40 },
      { name: 'Pilgrim Waste (Tirumala)', description: 'Massive generation of plastic and organic waste by pilgrims, posing a challenge for waste management.', pollutants: ['Plastic Waste', 'Organic Waste', 'Litter'], illustrativeAQI: 'High Waste Generation', lat: 13.68, lng: 79.35 },
      { name: 'Industrial Area (near Renigunta)', description: 'Small-scale industries, sometimes with inadequate pollution control measures.', pollutants: ['Particulates', 'Odour', 'Wastewater'], illustrativeAQI: 'Moderate (95)', lat: 13.63, lng: 79.48 },
      { name: 'Tirupati Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 13.66, lng: 79.43 },
    ],
    traffic: [
      { name: 'RTC Bus Stand Area (Tirupati)', description: 'Public transport hub, constant movement of buses, autos, and pedestrians, leading to severe congestion.', peakHours: 'All day, especially during festivals', causes: ['Bus movement', 'Pedestrian crossing', 'Parking violations', 'Unregulated vendors', 'Auto rickshaw congestion'], lat: 13.65, lng: 79.42 },
      { name: 'Kapila Theertham Road', description: 'Pilgrim route, high traffic during festivals and weekends, limited parking, and slow-moving pilgrim vehicles.', peakHours: 'Festival days, Weekends', causes: ['Pilgrim movement', 'Limited parking', 'Roadside stalls', 'Bus congestion'], lat: 13.65, lng: 79.42 },
      { name: 'Leela Mahal Circle', description: 'Major city intersection, high vehicle volume, multiple merging points, and signal congestion.', peakHours: 'Peak commuting hours (8-10 AM, 5-7 PM)', causes: ['Signal congestion', 'Lane cutting', 'Illegal U-turns', 'High vehicle density', 'Multiple merging roads'], lat: 13.65, lng: 79.42 },
      { name: 'Renigunta Airport Road', description: 'Connects to airport, fast-moving traffic, and sometimes creates bottlenecks due to merging traffic.', peakHours: 'Flight times', causes: ['Airport traffic', 'Merging traffic', 'High speed vehicles', 'Lane indiscipline'], lat: 13.63, lng: 79.48 },
      { name: 'Tiruchanur Road', description: 'Pilgrim route, high traffic volume, and frequent bottlenecks.', peakHours: 'Evenings, Festival days', causes: ['Pilgrim movement', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 13.60, lng: 79.40 },
    ],
    recommendations: { general: ["Promote sustainable pilgrimage management and tourism.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on ghat roads.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety checks for pilgrim buses.", "Improve road conditions and lighting on rural roads."], pollution: ["Improve urban waste collection and sewage treatment.", "Implement robust waste management for pilgrim areas.", "Monitor river water quality regularly and prevent illegal dumping.", "Support green initiatives in industrial zones."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and pilgrim areas.", "Develop alternative routes to reduce congestion in city areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
  "Chittoor": {
    accidents: [
      { name: 'Chittoor-Bengaluru Highway', description: 'Interstate highway, high speed, frequent rear-end collisions and lane cutting.', causes: ['Overspeeding', 'Lack of service roads', 'Sudden braking', 'Improper merging'], lat: 13.20, lng: 79.00 },
      { name: 'Palamaner Ghat Road', description: 'Hilly terrain, sharp curves, prone to vehicle overturning and skidding, especially during monsoons.', causes: ['Unsafe overtaking', 'Brake failure', 'Driver inexperience', 'Wet roads'], lat: 13.20, lng: 78.75 },
      { name: 'Kuppam Road', description: 'Connects to border areas, heavy truck traffic, sometimes unlit, and potholes.', causes: ['Unsafe overtaking', 'Animal crossing', 'Drunk driving', 'Potholes', 'Heavy vehicle movement'], lat: 12.75, lng: 78.35 },
      { name: 'Satyavedu Road', description: 'Rural stretch, unlit areas, mixed agricultural and private vehicles, and animal crossing.', causes: ['Drunk driving', 'Animal crossing', 'Poor road surface', 'Lack of reflective markers'], lat: 13.40, lng: 79.80 },
      { name: 'Nagari Road', description: 'Connects to major towns, mixed traffic, sometimes narrow, and pedestrian crossing issues.', causes: ['Narrow sections', 'Improper overtaking', 'Pedestrian crossing', 'Unmarked turns'], lat: 13.40, lng: 79.60 },
    ],
    pollution: [
      { name: 'Chittoor Urban Area', description: 'Vehicular emissions, domestic waste burning, and improper sewage disposal leading to air and water pollution.', pollutants: ['PM2.5', 'PM10', 'Soot', 'Fecal Coliform'], illustrativeAQI: 'Moderate (100)', lat: 13.20, lng: 79.10 },
      { name: 'Palace Road (Chittoor)', description: 'Commercial area, high vehicular emissions, and noise pollution.', pollutants: ['PM2.5', 'NOx', 'CO', 'Noise'], illustrativeAQI: 'Moderate (90)', lat: 13.20, lng: 79.10 },
      { name: 'Dairy Farms (near Palamaner)', description: 'Animal waste runoff impacting local water bodies and soil.', pollutants: ['Nitrates', 'Ammonia', 'Organic Waste', 'E.coli'], illustrativeAQI: 'Water Contamination Risk', lat: 13.20, lng: 78.75 },
      { name: 'Chittoor Municipal Waste Dump', description: 'Open dumping and burning of municipal solid waste, causing localized air and soil pollution.', pollutants: ['Methane', 'Smoke', 'Leachate (soil/water)'], illustrativeAQI: 'Local Impact', lat: 13.21, lng: 79.11 },
      { name: 'Agricultural Fields (Pesticide Use)', description: 'Runoff from extensive agricultural land, leading to pesticide residues in soil and water bodies.', pollutants: ['Pesticide Residues', 'Nitrates', 'Soil Contamination'], illustrativeAQI: 'Soil/Water Contamination Risk', lat: 13.30, lng: 79.00 },
    ],
    traffic: [
      { name: 'Chittoor Town Center (Gandhi Circle)', description: 'Commercial hub, mixed traffic, narrow lanes, high pedestrian activity, and unorganized parking.', peakHours: 'Evenings, Market Days', causes: ['Narrow lanes', 'Unorganized parking', 'Street vendors', 'Pedestrian jaywalking', 'Auto rickshaw congestion'], lat: 13.20, lng: 79.10 },
      { name: 'RTC Bus Stand Area (Chittoor)', description: 'Public transport hub, constant bus and auto movement, and pedestrian crossings leading to congestion.', peakHours: 'Morning & Evening', causes: ['Bus congestion', 'Pedestrian crossing', 'Illegal parking', 'Unregulated auto stands'], lat: 13.20, lng: 79.10 },
      { name: 'Palamaner Main Road', description: 'Town center, market area, mixed traffic, and frequent bottlenecks.', peakHours: 'Afternoons', causes: ['Local commerce', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 13.20, lng: 78.75 },
      { name: 'Kuppam Town Center', description: 'Commercial hub, mixed traffic, and frequent bottlenecks due to market activity.', peakHours: 'Evenings', causes: ['Market congestion', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 12.75, lng: 78.35 },
      { name: 'Nagari Town Center', description: 'Commercial and administrative hub, mixed traffic, and frequent bottlenecks.', peakHours: 'Evenings', causes: ['Commercial activity', 'On-street parking', 'Narrow sections', 'Delivery vehicles'], lat: 13.40, lng: 79.60 },
    ],
    recommendations: { general: ["Promote sustainable agricultural practices and robust environmental monitoring.", "Invest in public transportation and road safety infrastructure.", "Optimize traffic flow and parking solutions."], specific: { accidents: ["Strict enforcement of speed limits and traffic rules on highways.", "Improve road design at black spots and provide clear signage.", "Conduct regular safety checks for vehicles on ghat roads.", "Improve road conditions and lighting on rural roads."], pollution: ["Improve urban waste collection and sewage treatment.", "Regulate dairy farm waste and promote sustainable practices.", "Monitor water quality in rivers and agricultural runoff.", "Support green initiatives in industrial zones."], traffic: ["Optimize traffic signal timings and flow at major circles.", "Improve parking management around bus stands and commercial areas.", "Develop alternative routes to reduce congestion in town areas.", "Manage heavy vehicle movement and create bypasses."] } }
  },
};


// Main App Component (rest of the code remains the same as previous)
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDistrict, setSelectedDistrict] = useState('Visakhapatnam'); // Default to Visakhapatnam
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get data for the currently selected district
  const currentDistrictData = districtsData[selectedDistrict] || {
    accidents: [],
    pollution: [],
    traffic: [],
    recommendations: { general: ["No specific recommendations available for this district yet."], specific: { accidents: [], pollution: [], traffic: [] } }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} districts={Object.keys(districtsData).sort()} />; // Sort districts alphabetically
      case 'accidents':
        return <AccidentSection data={currentDistrictData.accidents} selectedDistrict={selectedDistrict} />;
      case 'pollution':
        return <PollutionSection data={currentDistrictData.pollution} selectedDistrict={selectedDistrict} />;
      case 'traffic':
        return <TrafficSection data={currentDistrictData.traffic} selectedDistrict={selectedDistrict} />;
      case 'recommendations':
        return <RecommendationsSection data={currentDistrictData.recommendations} selectedDistrict={selectedDistrict} />;
      default:
        return <HomeSection selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} districts={Object.keys(districtsData).sort()} />;
    }
  };

  const NavItem = ({ section, icon: Icon, label }) => (
    <button
      className={`flex items-center px-4 py-2 rounded-md text-white text-lg font-medium transition-colors duration-300
        ${activeSection === section ? 'bg-sky-700 shadow-inner' : 'hover:bg-sky-800'}`}
      onClick={() => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      }}
    >
      <Icon className="mr-2" size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      {/* Header */}
      <header className="bg-sky-900 text-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">AP Insights</h1>
          <nav className="hidden md:flex space-x-4">
            <NavItem section="home" icon={Home} label="Home" />
            <NavItem section="accidents" icon={Car} label="Accidents" />
            <NavItem section="pollution" icon={Cloud} label="Pollution" />
            <NavItem section="traffic" icon={TrafficCone} label="Traffic" />
            <NavItem section="recommendations" icon={Lightbulb} label="Recommendations" />
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-sky-800 p-2 rounded-md">
            <NavItem section="home" icon={Home} label="Home" />
            <NavItem section="accidents" icon={Car} label="Accidents" />
            <NavItem section="pollution" icon={Cloud} label="Pollution" />
            <NavItem section="traffic" icon={TrafficCone} label="Traffic" />
            <NavItem section="recommendations" icon={Lightbulb} label="Recommendations" />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-6 md:p-8">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-sky-900 text-white p-6 text-center mt-12 shadow-inner">
        <p>© {new Date().getFullYear()} Andhra Pradesh Community Project. All rights reserved.</p>
        <p className="text-sm mt-2 text-gray-300">
          Disclaimer: Data presented here is illustrative and based on publicly available information and common urban challenges. For official statistics and detailed analysis, please refer to government reports and conduct primary research.
        </p>
      </footer>
    </div>
  );
}

// Home Section Component
const HomeSection = ({ selectedDistrict, setSelectedDistrict, districts }) => (
  <section className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
    <h2 className="text-4xl font-extrabold text-sky-900 mb-6 text-center">
      Understanding Andhra Pradesh's Urban Challenges
    </h2>
    <p className="text-lg leading-relaxed mb-6 text-gray-700">
      Welcome to the Andhra Pradesh City Insights project! Select a district below to explore key areas prone to road accidents, environmental pollution, and traffic congestion. Our goal is to raise awareness and provide actionable insights for local authorities and citizens to work towards safer, cleaner, and more efficient cities across the state.
    </p>

    {/* District Selection Dropdown */}
    <div className="mb-8 text-center">
      <label htmlFor="district-select" className="block text-2xl font-semibold text-sky-800 mb-3">
        Select a District:
      </label>
      <select
        id="district-select"
        className="px-5 py-3 border border-sky-400 rounded-lg text-xl bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <p className="text-lg text-gray-600 mt-4">
        Currently viewing insights for: <span className="font-bold text-sky-700">{selectedDistrict}</span>
      </p>
    </div>

    {/* Conceptual Map Image */}
    <div className="mb-10 text-center">
      <h3 className="text-2xl font-semibold text-sky-800 mb-4">Districts of AP</h3>
      <img
        src="/ap map.jpg"
        alt="Andhra Pradesh Map highlighting Accident, Traffic, and Pollution prone areas"
        className="rounded-lg shadow-md mx-auto w-full max-w-xl border border-gray-300" // Reduced size to max-w-xl
      />
      <p className="text-sm text-gray-600 mt-2">
        (This is a conceptual map. In your final project, you can replace this with a custom map of Andhra Pradesh,
        where you visually mark hotpsots within the selected district based on your research findings.)
      </p>
    </div>

    <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
      <div className="bg-sky-50 p-6 rounded-lg shadow-sm border border-sky-200 flex flex-col items-center">
        <Car size={48} className="text-sky-700 mb-4" />
        <h3 className="text-xl font-semibold text-sky-800">Road Safety</h3>
        <p className="text-gray-700 mt-2">Identifying accident blackspots to prevent future mishaps.</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200 flex flex-col items-center">
        <Cloud size={48} className="text-green-700 mb-4" />
        <h3 className="text-xl font-semibold text-green-800">Environmental Health</h3>
        <p className="text-gray-700 mt-2">Pinpointing polluted zones for cleaner air and water.</p>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200 flex flex-col items-center">
        <TrafficCone size={48} className="text-yellow-700 mb-4" />
        <h3 className="text-xl font-semibold text-yellow-800">Traffic Management</h3>
        <p className="text-gray-700 mt-2">Mapping congestion points for smoother city commutes.</p>
      </div>
    </div>
  </section>
);

// Section for displaying information about each category
const CategorySection = ({ title, description, items, icon: Icon, bgColor, textColor, selectedDistrict }) => (
  <section className={`bg-white p-8 rounded-xl shadow-lg animate-fade-in`}>
    <h2 className={`text-4xl font-extrabold ${textColor} mb-6 text-center`}>
      <Icon className="inline-block mr-3" size={40} /> {title} for {selectedDistrict}
    </h2>
    <p className="text-lg leading-relaxed mb-8 text-gray-700">
      {description}
    </p>

    {items.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className={`${bgColor} p-6 rounded-lg shadow-md border border-gray-200`}>
            <h3 className={`text-2xl font-bold ${textColor} mb-3`}>{item.name}</h3>
            <p className="text-gray-700 mb-2">{item.description}</p>
            {item.causes && (
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Common Causes:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {item.causes.map((cause, i) => <li key={i}>{cause}</li>)}
                </ul>
              </div>
            )}
            {item.pollutants && (
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Key Pollutants:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {item.pollutants.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <p className="font-semibold text-gray-800 mt-2">Illustrative AQI: <span className="font-normal">{item.illustrativeAQI}</span></p>
              </div>
            )}
            {item.peakHours && (
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Peak Hours: <span className="font-normal">{item.peakHours}</span></p>
              </div>
            )}
            {/* View on Google Maps Button */}
            {item.lat && item.lng && (
              <div className="mt-6 text-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-sky-700 text-white font-semibold rounded-md shadow-md hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
                >
                  <MapPin size={20} className="mr-2" /> View on Google Maps
                </a>
                <p className="text-xs text-gray-600 mt-2">
                  (Opens in a new tab)
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-xl text-gray-600 italic">No data available for {title.toLowerCase()} in {selectedDistrict} yet. Please check back later or contribute data!</p>
    )}
  </section>
);

const AccidentSection = ({ data, selectedDistrict }) => (
  <CategorySection
    title="Accident-Prone Areas"
    description={`Detailed insights into accident hotspots in ${selectedDistrict}. Understanding these areas is crucial for implementing targeted safety measures.`}
    items={data}
    icon={Car}
    bgColor="bg-red-50"
    textColor="text-red-900"
    selectedDistrict={selectedDistrict}
  />
);

const PollutionSection = ({ data, selectedDistrict }) => (
  <CategorySection
    title="Polluted Areas"
    description={`Highlighting regions in ${selectedDistrict} that experience elevated levels of environmental pollution. This section aims to shed light on sources and impacts.`}
    items={data}
    icon={Cloud}
    bgColor="bg-green-50"
    textColor="text-green-900"
    selectedDistrict={selectedDistrict}
  />
);

const TrafficSection = ({ data, selectedDistrict }) => (
  <CategorySection
    title="Traffic-Prone Areas"
    description={`Mapping out areas in ${selectedDistrict} known for recurring traffic congestion and bottlenecks, especially during peak hours. Understanding these patterns is vital for improving urban mobility.`}
    items={data}
    icon={TrafficCone}
    bgColor="bg-yellow-50"
    textColor="text-yellow-900"
    selectedDistrict={selectedDistrict}
  />
);

// Recommendations Section Component
const RecommendationsSection = ({ data, selectedDistrict }) => (
  <section className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
    <h2 className="text-4xl font-extrabold text-sky-900 mb-6 text-center">
      <Lightbulb className="inline-block mr-3 text-sky-700" size={40} /> Recommendations for a Better {selectedDistrict}
    </h2>
    <p className="text-lg leading-relaxed mb-8 text-gray-700">
      Based on the analysis of challenges in {selectedDistrict}, here are some general and specific recommendations to improve the quality of life and urban environment. These suggestions are aimed at fostering collaboration between citizens and local authorities.
    </p>

    <div className="mb-10">
      <h3 className="text-3xl font-bold text-sky-800 mb-4">General Recommendations</h3>
      {data.general.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
          {data.general.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-sky-600">•</span> {rec}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">No general recommendations available for {selectedDistrict} yet.</p>
      )}
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Accidents Recommendations */}
      <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
        <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
          <Car size={24} className="mr-2 text-red-700" /> Accidents
        </h3>
        {data.specific.accidents.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {data.specific.accidents.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-red-600">•</span> {rec}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No specific recommendations for accidents in {selectedDistrict} yet.</p>
        )}
      </div>

      {/* Pollution Recommendations */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
        <h3 className="text-2xl font-bold text-green-800 mb-4 flex flex-center">
          <Cloud size={24} className="mr-2 text-green-700" /> Pollution
        </h3>
        {data.specific.pollution.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {data.specific.pollution.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-green-600">•</span> {rec}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No specific recommendations for pollution in {selectedDistrict} yet.</p>
        )}
      </div>

      {/* Traffic Recommendations */}
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
        <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
          <TrafficCone size={24} className="mr-2 text-yellow-700" /> Traffic
        </h3>
        {data.specific.traffic.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {data.specific.traffic.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-yellow-600">•</span> {rec}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No specific recommendations for traffic in {selectedDistrict} yet.</p>
        )}
      </div>
    </div>

    <div className="mt-10 text-center p-6 bg-sky-50 rounded-lg shadow-inner border border-sky-200">
      <h3 className="text-2xl font-bold text-sky-800 mb-3">Call to Action</h3>
      <p className="text-lg text-gray-700">
        We encourage citizens to actively participate in reporting issues, advocating for change, and adopting sustainable practices. Your involvement is key to making Andhra Pradesh a truly smart, safe, and sustainable state.
      </p>
    </div>
  </section>
);

export default App;
