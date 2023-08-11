// Copyright (c) Bill Chadwick Feb 2012.

var arrowOverlayMarkerCounter;function ArrowOverlay(map,location,rotation,length,color,opacity){this.map_=map;this.location_=location;this.rotation_=rotation;this.length_=(40.0/Math.log(71.0))*Math.log(length+1)+5;var r=this.rotation_+90;this.dx_=Math.cos(r*Math.PI/180)*this.length_;this.dy_=Math.sin(r*Math.PI/180)*this.length_;this.color_=color||"#000000";this.strokeweight_="2px";this.opacity_=opacity||0.6;this.div_=null;if(arrowOverlayMarkerCounter==null)
arrowOverlayMarkerCounter=0;else
arrowOverlayMarkerCounter+=1;this.svgId_="ArrowOverlay"+arrowOverlayMarkerCounter.toString();}
ArrowOverlay.prototype=new google.maps.OverlayView();ArrowOverlay.prototype.onAdd=function(){var div=document.createElement('DIV');var obj=this;if(supportsVML()){var l=createVmlElement('v:line',div);l.strokeweight=this.strokeweight_;l.strokecolor=this.color_;l.style.position='absolute';var s=createVmlElement("v:stroke",l);s.opacity=this.opacity_;s.startarrow="classic";this.vmlLine_=l;}
else{var svgNS="http://www.w3.org/2000/svg";var svgRoot=document.createElementNS(svgNS,"svg");svgRoot.setAttribute("width",45);svgRoot.setAttribute("height",45);svgRoot.setAttribute("stroke",this.color_);svgRoot.setAttribute("fill",this.color_);svgRoot.setAttribute("stroke-opacity",this.opacity_);svgRoot.setAttribute("fill-opacity",this.opacity_);div.appendChild(svgRoot);var svgNode=document.createElementNS(svgNS,"line");svgNode.setAttribute("stroke-width",1.8);svgNode.setAttribute("x1",20+this.dx_);svgNode.setAttribute("y1",20+this.dy_);svgNode.setAttribute("x2",20);svgNode.setAttribute("y2",20);if(this.rotation_>=0&&this.length_>4)
{var svgM=document.createElementNS(svgNS,"marker");svgM.id=this.svgId_;svgM.setAttribute("viewBox","0 0 10 10");svgM.setAttribute("refX",0);svgM.setAttribute("refY",5);svgM.setAttribute("markerWidth",4);svgM.setAttribute("markerHeight",3);svgM.setAttribute("orient","auto");var svgPath=document.createElementNS(svgNS,"path");svgPath.setAttribute("d","M 10 0 L 0 5 L 10 10 z");svgM.appendChild(svgPath);svgRoot.appendChild(svgM);svgNode.setAttribute("marker-start","url(#"+this.svgId_+")");}
svgRoot.appendChild(svgNode);this.svgRoot_=svgRoot;this.svgNode_=svgNode;}
this.div_=div;var panes=this.getPanes();panes.overlayImage.appendChild(this.div_);}
ArrowOverlay.prototype.draw=function(){var overlayProjection=this.getProjection();var p=overlayProjection.fromLatLngToDivPixel(this.location_);var div=this.div_;if(!div)
return;if(!div.style)
return;var x2=p.x+this.dx_;var y2=p.y+this.dy_;if(supportsVML()){this.vmlLine_.from=p.x+"px, "+p.y+"px";this.vmlLine_.to=x2+"px, "+y2+"px";}
else{this.svgRoot_.setAttribute("style","position:absolute; top:"+(p.y-20)+"px; left:"+(p.x-20)+"px");}}
ArrowOverlay.prototype.onRemove=function(){this.div_.parentNode.removeChild(this.div_);}
ArrowOverlay.prototype.setVisible=function(v){if(v)
this.show();else
this.hide();}
ArrowOverlay.prototype.getVisible=function(v){if(this.div_){return(this.div_.style.display=="");}
return false;}
ArrowOverlay.prototype.hide=function(){if(this.div_){this.div_.style.display="none";}}
ArrowOverlay.prototype.show=function(){if(this.div_){this.div_.style.display="";}}
ArrowOverlay.prototype.setPosition=function(l){this.location_=l;this.draw();}
ArrowOverlay.prototype.getPosition=function(){return this.location_;}
ArrowOverlay.prototype.setHeading=function(h){this.rotation_=h||0.0;var r=this.rotation_+90;this.dx_=20*Math.cos(r*Math.PI/180);this.dy_=20*Math.sin(r*Math.PI/180);if(!supportsVML()){this.svgNode_.setAttribute("x2",20+this.dx_);this.svgNode_.setAttribute("y2",20+this.dy_);}
this.draw();}
ArrowOverlay.prototype.getHeading=function(){return this.rotation_;}
ArrowOverlay.prototype.toggle=function(){if(this.div_){if(this.div_.style.visibility=="hidden"){this.show();}else{this.hide();}}}
ArrowOverlay.prototype.fromDivPixelToLatLng=function(x,y){var overlayProjection=this.getProjection();return overlayProjection.fromDivPixelToLatLng(new google.maps.Point(x,y));}
ArrowOverlay.prototype.fromLatLngToContainerPixel=function(p){var overlayProjection=this.getProjection();return overlayProjection.fromLatLngToContainerPixel(p);}
var SVG_NAMESPACE='http://www.w3.org/2000/svg';function supportsSVG(){return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape','1.1');}
var VML_NAMESPACE='urn:schemas-microsoft-com:vml';function createVmlElement(tagName,parent){var element=document.createElement(tagName);parent.appendChild(element);element.style['behavior']='url(#default#VML)';return element;}
function supportsVML(){if(supportsVML.result_==null){if(!maybeCreateVmlNamespace()){return supportsVML.result_=false;}
var div=document.createElement('DIV');document.body.appendChild(div);div.innerHtml='<v:shape id="vml_flag1" adj="1" />';var child=div.firstChild;if(child)child.style['behavior']='url(#default#VML)';supportsVML.result_=!child||(typeof child['adj']=='object');div.parentNode.removeChild(div);}
return supportsVML.result_;}
function maybeCreateVmlNamespace(){var hasVmlNamespace=false;if(document.namespaces){for(var x=0;x<document.namespaces.length;x++){var ns=document.namespaces(x);if(ns.name=='v'){if(ns.urn==VML_NAMESPACE){hasVmlNamespace=true;}else{throw new Error('document namespace v: is required for VML '+'but has been reserved for '+ns.urn);}}}
if(!hasVmlNamespace){hasVmlNamespace=true;document.namespaces.add('v',VML_NAMESPACE);}}
return hasVmlNamespace;}// Copyright (c) 2006-2014 Carola Kaiser, Louisiana State University

function get_textcontent(node)
{if(!node)return'';return node.textContent||node.firstChild&&node.firstChild.nodeValue||'';}
function get_class(marker,badxml)
{var msclass=marker.getElementsByTagName(badxml?"CLASS":"ms:CLASS");if(!msclass[0])
msclass=marker.getElementsByTagName(badxml?"class":"ms:class");return get_textcontent(msclass[0]);}
function get_current_layer()
{var layer=$('input:radio[name=layer0]:checked').val();return layer;}
function select_timestep_layer(map,date)
{var layer=get_current_layer();var theme=get_theme(map.data,layer);if(layer.indexOf('max')!==-1){layer=layer.substr(3);}
var current_layer0=get_current_layer();if(current_layer0.indexOf('shp')!==-1)
theme=theme+'shp';var $theme_radio=$('input:radio[name=layer0][value='+theme+']');var $theme_select=$('#timestep_'+theme);var value=date.formatDate('yyyyMMddTHHmm');if(value!==$theme_select.val()||!$theme_radio.prop('checked')){$theme_radio.prop('checked',true);$theme_select.val(value);$theme_select.selectmenu("refresh");set_checked_timestep(map.data,layer,value);}
selectMapCheckValue(layer,map,layer);}
function convertPoint(latLng)
{var topRight=map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());var bottomLeft=map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());var scale=Math.pow(2,map.getZoom());var worldPoint=map.getProjection().fromLatLngToPoint(latLng);return new google.maps.Point((worldPoint.x-bottomLeft.x)*scale,(worldPoint.y-topRight.y)*scale);}
function get_tooltip_color(stat,cat,category)
{var trackpoint_tooltip_color,storm_category;if(stat==='PT'||cat==='pt'){storm_category='Post-Tropical Cyclone';}
else if(stat==='EX'||cat==='ex'){storm_category='Extra-Tropical Cyclone';}
else if(cat==='td'){storm_category='Tropical Depression';}
else if(cat==='ts'){storm_category='Tropical Storm';}
else if(cat==='h1'){storm_category='Hurricane (H1)';}
else if(cat==='h2'){storm_category='Hurricane (H2)';}
else if(cat==='h3'){storm_category='Hurricane (H3)';}
else if(cat==='h4'){storm_category='Hurricane (H4)';}
else if(cat==='h5'){storm_category='Hurricane (H5)';}
else if(cat==='ds'){storm_category='Dissipating';}
else if(cat==='rem'){storm_category='Remnants';}
else if(cat==='db'){storm_category='Disturbance';}
else if(cat==='lo'){storm_category='Low';}
else if(cat==='sd'){storm_category='Subtropical Depression';}
else if(cat==='ss'){storm_category='Subtropical Storm';}
else if(cat==='ptc'){storm_category='Potential Tropical Storm';}
if(category==='out'||cat==='-999'){trackpoint_tooltip_color='#CCC';}
else{if(cat==='td'||cat==='sd'){trackpoint_tooltip_color='#3565FF';}
else if(cat==='ts'||cat==='ss'){trackpoint_tooltip_color='#5EBBFF';}
else if(cat==='h1'){trackpoint_tooltip_color='#FFFFBA';}
else if(cat==='h2'){trackpoint_tooltip_color='#FFEC78';}
else if(cat==='h3'){trackpoint_tooltip_color='#FF9900';}
else if(cat==='h4'){trackpoint_tooltip_color='#FF5000';}
else if(cat==='h5'){trackpoint_tooltip_color='#CC0000';}
else if(cat==='ds'||cat==='rem'||cat==='db'||cat==='lo'||cat==='pt'||cat==='ex'||cat==='ptc'){trackpoint_tooltip_color='#99CCCC';}}
return{trackpoint_tooltip_color:trackpoint_tooltip_color,storm_category:storm_category};}
function get_stormdirection(dir_degree)
{var dir;if((dir_degree>348.75&&dir_degree<=360)||(dir_degree>=0&&dir_degree<=11.25)){dir='North';}
else if(dir_degree>11.25&&dir_degree<=33.75){dir='North-Northeast';}
else if(dir_degree>33.75&&dir_degree<=56.25){dir='Northeast';}
else if(dir_degree>56.25&&dir_degree<=78.75){dir='East-Northeast';}
else if(dir_degree>78.75&&dir_degree<=101.25){dir='East';}
else if(dir_degree>101.25&&dir_degree<=123.75){dir='East-Southeast';}
else if(dir_degree>123.75&&dir_degree<=146.25){dir='Southeast';}
else if(dir_degree>146.255&&dir_degree<=168.75){dir='South-Southeast';}
else if(dir_degree>168.75&&dir_degree<=191.25){dir='South';}
else if(dir_degree>191.255&&dir_degree<=213.75){dir='South-Southwest';}
else if(dir_degree>213.75&&dir_degree<=236.25){dir='Southwest';}
else if(dir_degree>236.25&&dir_degree<=258.75){dir='West-Southwest';}
else if(dir_degree>258.75&&dir_degree<=281.25){dir='West';}
else if(dir_degree>281.25&&dir_degree<=303.75){dir='West-Northwest';}
else if(dir_degree>303.75&&dir_degree<=326.25){dir='Northwest';}
else if(dir_degree>326.25&&dir_degree<=348.75){dir='North-Northwest';}
return dir;}
function create_track_tooltip(cfg,marker,badxml,cls,category,cat,time,coords)
{var mstimediff=marker.getElementsByTagName(badxml?"TIMEDIFF":"ms:TIMEDIFF");var timediff=get_textcontent(mstimediff[0]);var msmaxwind=marker.getElementsByTagName(badxml?"VMAX":"ms:VMAX");var show_cat='none';if(cat!=='-999'){show_cat='inline';}
var show_vmax='none';var maxwind_kt=get_textcontent(msmaxwind[0]);var maxwind_mph=-999;if(maxwind_kt!=='-999'){maxwind_mph=Math.round((maxwind_kt*1.150779*10)/10).toFixed(0);show_vmax='inline';}
var show_adv='none';var show_gusts='none';var show_press='none';var show_move='none';var msgusts=marker.getElementsByTagName(badxml?"GUSTS":"ms:GUSTS");var gusts_kt=get_textcontent(msgusts[0]);var gusts_mph=-999;if(gusts_kt!=='-999'){gusts_mph=Math.round((gusts_kt*1.150779*10)/10).toFixed(0);if(gusts_kt!=='0'){show_gusts='inline';}}
var msminpress=marker.getElementsByTagName(badxml?"MSLP":"ms:MSLP");var minpress=get_textcontent(msminpress[0]);if(minpress!=='0'){show_press='inline';}
var msstat=marker.getElementsByTagName(badxml?"STAT":"ms:STAT");var stat=get_textcontent(msstat[0]);if(cls==='2'){var msdir=marker.getElementsByTagName(badxml?"DIR":"ms:DIR");var dir_degree=parseFloat(get_textcontent(msdir[0]));var dir=get_stormdirection(dir_degree);var msspeed=marker.getElementsByTagName(badxml?"SPEED":"ms:SPEED");var speed_kt=get_textcontent(msspeed[0]);var speed_mph=Math.round((speed_kt*1.150779*10)/10).toFixed(0);if(dir_degree!==0&&speed_kt!=='0'){show_move='inline';}
var movement=dir+' at '+speed_kt+' knots ('+speed_mph+' mph)';}
var pred_cat='';var status;if(parseInt(timediff)===0||!timediff||timediff===''){status='(Advisory # ';show_adv='inline';}
else if(parseInt(timediff)<0){status='('+timediff+' hrs Hindcast)';}
else if(parseInt(timediff)>0){status='('+timediff+' hrs Forecast)';pred_cat='Predicted ';}
var tp=get_tooltip_color(stat,cat,category);var trackpoint_tooltip_color=tp.trackpoint_tooltip_color;var storm_category=tp.storm_category;dt=time+' '+cfg.timezone.toUpperCase();var x=parseFloat(coords[0])*(-1).toFixed(1);var y=parseFloat(coords[1]).toFixed(1);var data={data_template:{cat_track_color:trackpoint_tooltip_color,status:status,show_adv:show_adv,show_cat:show_cat,predicted_category:pred_cat,storm_category_name:storm_category,datetime:dt,maxwind_kt:maxwind_kt,maxwind_mph:maxwind_mph,show_vmax:show_vmax,show_gusts:show_gusts,gusts_kt:gusts_kt,gusts_mph:gusts_mph,show_press:show_press,minpress:minpress,x:x,y:y,show_move:show_move,movement:movement,labelstyle:''},marker:null,labeloffset:null};return data;}
function has_timestep(layers,d){if(!layers)
return false;var date=d.formatDate('yyyyMMddTHHmm');var retval=false;$.each(layers,function(){if(this.value===date){retval=true;return false;}});return retval;}
function track_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=2){iconsize=11;}
else if(zoomlevel===3){iconsize=12;}
else if(zoomlevel===4){iconsize=14;}
else if(zoomlevel===5){iconsize=16;}
else if(zoomlevel===6){iconsize=17;}
else if(zoomlevel===7){iconsize=18;}
else if(zoomlevel===8){iconsize=19;}
else if(zoomlevel===9){iconsize=21;}
else if(zoomlevel===10){iconsize=23;}
else if(zoomlevel===11){iconsize=25;}
else if(zoomlevel===12){iconsize=27;}
else if(zoomlevel>12){iconsize=30;}
return iconsize;}
function rem_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=3){iconsize=17;}
else if(zoomlevel===4){iconsize=18;}
else if(zoomlevel===5){iconsize=20;}
else if(zoomlevel===6){iconsize=22;}
else if(zoomlevel===7){iconsize=24;}
else if(zoomlevel===8){iconsize=26;}
else if(zoomlevel===9){iconsize=29;}
else if(zoomlevel===10){iconsize=32;}
else if(zoomlevel===11){iconsize=35;}
else if(zoomlevel===12){iconsize=39;}
else if(zoomlevel===13){iconsize=43;}
else if(zoomlevel===14){iconsize=47;}
else if(zoomlevel>14){iconsize=51;}
return iconsize;}
function subtrack_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=5){iconsize=26;}
else if(zoomlevel===6){iconsize=28;}
else if(zoomlevel===7){iconsize=30;}
else if(zoomlevel===8){iconsize=32;}
else if(zoomlevel===9){iconsize=35;}
else if(zoomlevel===10){iconsize=38;}
else if(zoomlevel===11){iconsize=41;}
else if(zoomlevel===12){iconsize=45;}
else if(zoomlevel===13){iconsize=49;}
else if(zoomlevel===14){iconsize=53;}
else if(zoomlevel>14){iconsize=57;}
return iconsize;}
function hurricane_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=2){iconsize=28;}
else if(zoomlevel===3){iconsize=29;}
else if(zoomlevel===4){iconsize=31;}
else if(zoomlevel===5){iconsize=33;}
else if(zoomlevel===6){iconsize=36;}
else if(zoomlevel===7){iconsize=40;}
else if(zoomlevel===8){iconsize=44;}
else if(zoomlevel===9){iconsize=50;}
else if(zoomlevel===10){iconsize=56;}
else if(zoomlevel===11){iconsize=62;}
else if(zoomlevel===12){iconsize=70;}
else if(zoomlevel===13){iconsize=78;}
else if(zoomlevel===14){iconsize=86;}
else if(zoomlevel>14){iconsize=94;}
return iconsize;}
function station_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=5){iconsize=19;}
else if(zoomlevel===6){iconsize=21;}
else if(zoomlevel===7){iconsize=23;}
else if(zoomlevel===8){iconsize=25;}
else if(zoomlevel===9){iconsize=27;}
else if(zoomlevel===10){iconsize=30;}
else if(zoomlevel===11){iconsize=33;}
else if(zoomlevel===12){iconsize=37;}
else if(zoomlevel==13){iconsize=42;}
else if(zoomlevel==14){iconsize=47;}
else if(zoomlevel>14){iconsize=52;}
return iconsize;}
function track_timesteps_icon_zoom(zoomlevel){var iconsize;if(zoomlevel<=2){iconsize=13;}
else if(zoomlevel===3){iconsize=14;}
else if(zoomlevel===4){iconsize=16;}
else if(zoomlevel===5){iconsize=17;}
else if(zoomlevel===6){iconsize=18;}
else if(zoomlevel===7){iconsize=21;}
else if(zoomlevel===8){iconsize=24;}
else if(zoomlevel===9){iconsize=27;}
else if(zoomlevel===10){iconsize=30;}
else if(zoomlevel===11){iconsize=33;}
else if(zoomlevel===12){iconsize=36;}
else if(zoomlevel>12){iconsize=39;}
return iconsize;}
function get_trackpoint_label_size(zoomlevel){var labelsize;if(zoomlevel<=5){labelsize="5"}
else if(zoomlevel===6||zoomlevel===7){labelsize="6"}
else if(zoomlevel===8||zoomlevel===9){labelsize="8"}
else if(zoomlevel>=10){labelsize="10"}
return labelsize;}
function get_curest_trackpoint_label_size(zoomlevel){var labelsize;if(zoomlevel<=3){labelsize="3"}
else if(zoomlevel===4||zoomlevel===5){labelsize="5"}
else if(zoomlevel===6||zoomlevel===7){labelsize="6"}
else if(zoomlevel===8||zoomlevel===9){labelsize="8"}
else if(zoomlevel>=10){labelsize="10"}
return labelsize;}
function get_subtrack_label_size(zoomlevel){var labelsize;if(zoomlevel<=5){labelsize="5";}
else if(zoomlevel===6||zoomlevel===7){labelsize="6";}
else if(zoomlevel===8||zoomlevel===9){labelsize="8";}
else if(zoomlevel==10||zoomlevel===11){labelsize="10";}
else{labelsize="12"}
return labelsize;}
function get_current_labeloffset(zoomlevel){var current_labeloffset;if(zoomlevel<=5){current_labeloffset=new google.maps.Size(13,-11);}
else if(zoomlevel===6||zoomlevel===7){current_labeloffset=new google.maps.Size(19,-11);}
else if(zoomlevel===8||zoomlevel===9){current_labeloffset=new google.maps.Size(23,-11);}
else if(zoomlevel===10||zoomlevel===11){current_labeloffset=new google.maps.Size(30,-12);}
else{current_labeloffset=new google.maps.Size(38,-12);}
return current_labeloffset;}
function get_labeloffset(zoomlevel){var labeloffset;if(zoomlevel<=6){labeloffset=new google.maps.Size(10,-9);}
else if(zoomlevel===7||zoomlevel===8){labeloffset=new google.maps.Size(12,-10);}
else if(zoomlevel===9||zoomlevel===10){labeloffset=new google.maps.Size(14,-10);}
else if(zoomlevel===11||zoomlevel===12){labeloffset=new google.maps.Size(16,-10);}
else{labeloffset=new google.maps.Size(18,-10);}
return labeloffset;}
function get_subtrack_labeloffset(zoomlevel){var subtrack_labeloffset;if(zoomlevel<=5){subtrack_labeloffset=new google.maps.Size(13,-11);}
else if(zoomlevel===6||zoomlevel===7){subtrack_labeloffset=new google.maps.Size(15,-11);}
else if(zoomlevel===8||zoomlevel===9){subtrack_labeloffset=new google.maps.Size(18,-11);}
else if(zoomlevel===10||zoomlevel===11){subtrack_labeloffset=new google.maps.Size(20,-12);}
else{subtrack_labeloffset=new google.maps.Size(22,-12);}
return subtrack_labeloffset;}
function createTrackMarker(map,point,icon,zindexprocess,data_array,date)
{var opts={icon:icon.icon,anchorPoint:icon.infoWindowAnchor,position:point,optimized:icon.optimized?true:false};if(zindexprocess)
opts.zIndex=zindexprocess;if(icon.icon.cursor)
opts.cursor=icon.icon.cursor;var marker=new google.maps.Marker(opts);google.maps.event.addListener(marker,"click",function(){if(date&&has_timestep(map.timesteps_json_layers,date)){select_timestep_layer(map,date);}});if(icon.hover_icon){google.maps.event.addListener(marker,"mouseover",function(){marker.setIcon(icon.hover_icon);});}
google.maps.event.addListener(marker,"mouseout",function(){if(icon.hover_icon){marker.setIcon(opts.icon);}
reset_cursor(map);});return marker;}
function create_icon(iconsize,svgpath,hover_svgpaths,optimized,anchor_y_coeff,anchor_y_window_coeff){var anchor_y=anchor_y_coeff||0.5;var anchor_y_window=anchor_y_window_coeff||0.5;var icon={url:'data:image/svg+xml;charset=utf-8, '+encodeURIComponent(svgpath),scaledSize:new google.maps.Size(iconsize,iconsize),anchor:new google.maps.Point(0.5*iconsize,anchor_y*iconsize)};var hover_icon;if(hover_svgpaths){hover_icon={url:'data:image/svg+xml;charset=utf-8, '+encodeURIComponent(hover_svgpaths),scaledSize:new google.maps.Size(1.4*iconsize,1.4*iconsize),anchor:new google.maps.Point(0.7*iconsize,anchor_y*1.4*iconsize)};}
return{icon:icon,hover_icon:hover_icon,infoWindowAnchor:new google.maps.Point(0.5*iconsize,(1.0-anchor_y_window)*iconsize),optimized:optimized?true:false};}
function create_track_icon(zoomlevel,svgpath,hover_svgpath,category)
{if(category==='out'){return create_icon(track_timesteps_icon_zoom(zoomlevel),svgpath,null,true);}
return create_icon(track_icon_zoom(zoomlevel),svgpath,hover_svgpath,true);}
function create_remnants_icon(zoomlevel,svgpath)
{return create_icon(rem_icon_zoom(zoomlevel),svgpath,null,true);}
function create_subtrack_icon(zoomlevel,svgpath,optimized)
{return create_icon(subtrack_icon_zoom(zoomlevel),svgpath,null,optimized);}
function create_hurricane_icon(zoomlevel,svgpath,optimized)
{return create_icon(hurricane_icon_zoom(zoomlevel),svgpath,null,optimized||zoomlevel<3);}
function get_xml_tag(xmlDoc,tagname)
{var tags;try{tags=xmlDoc.documentElement.getElementsByTagName(tagname);}
catch(err){}
return tags;}
function create_track_labels(map,cfg,wms_spec,zoomlevel,animation,data_array,layer_data)
{$('.gm-style').removeClass('gm-style');var wms_source=cfg.query_source;var notrackpoints=animation!==null&&animation;var nolabels=(animation!==null&&animation)||cfg.track_labels==='0';var labelsize=get_trackpoint_label_size(zoomlevel);var current_labeloffset=get_current_labeloffset(zoomlevel);var labeloffset=get_labeloffset(zoomlevel);var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=track_labels&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host);var track_point_mappings={'td':'td','ts':'ts','h1':'h1','h2':'h2','h3':'h3','h4':'h4','h5':'h5','sd':'td','ss':'ts','ds':'rem','rem':'rem','db':'rem','lo':'rem','ptc':'rem','pt':'rem','ex':'rem'};var svgdata=get_svg_icons('track_points',track_point_mappings);var hover_svgdata=get_svg_icons('track_points_hover',track_point_mappings);$.each(get_svg_icons('track_points_out',{'-999':'out','out':'out'}),function(key,value){svgdata[key]=value;});var hurr_icons=[];var hurr_south_icons=[];$.each(get_svg_icons('hurr',{'0':'hurr'}),function(key,value){hurr_icons.push(create_hurricane_icon(zoomlevel,value,animation));});$.each(get_svg_icons('hurr_south',{'0':'hurr_south'}),function(key,value){hurr_south_icons.push(create_hurricane_icon(zoomlevel,value,animation));});svgdata_hurr_estofs=get_svg_icons('hurr_estofs',track_point_mappings);$.each(get_svg_icons('hurr_remnants',{'rem':'hurr_remnants'}),function(key,value){svgdata[key]=value;});var icons_data={};$.when(url_promise).done(function(xmlDoc){if(zoomlevel!==map.getZoom()){return;}
var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:track_labels");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"track_labels");}
if(!markers){return;}
var active=zoomlevel>6;var markers_with_tooltip=[];var has_hurricane_symbol=null;for(var i=0;i<markers.length;++i){var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var tzuc=cfg.timezone.toUpperCase();var mslabel=markers[i].getElementsByTagName(badxml?"TIME"+tzuc:"ms:TIME"+tzuc);if(mslabel.length===0){mslabel=markers[i].getElementsByTagName(badxml?"TIME":"ms:TIME");}
var time=get_textcontent(mslabel[0]);var msdatetime=markers[i].getElementsByTagName(badxml?"DATETIME":"ms:DATETIME");var datetime=get_textcontent(msdatetime[0]);var d=$.datepicker.parseDate('yymmdd',datetime.substring(0,8));d.setHours(parseInt(datetime.substring(9,11)));var msstormnr=markers[i].getElementsByTagName(badxml?"STORMNR":"ms:STORMNR");var stormnr=get_textcontent(msstormnr[0]);var msstormname=markers[i].getElementsByTagName(badxml?"NAME":"ms:NAME");var stormname;if(msstormname){stormname=get_textcontent(msstormname[0]);}
var labelstyle;var coords=get_textcontent(gmlcoords[0]).split(",");var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));var cls=get_class(markers[i],badxml);if(cls!=="3"&&zoomlevel<=6){if(!active&&i<markers.length-1&&get_class(markers[i+1],badxml)!=="2"){active=true;continue;}}
var mscategory=markers[i].getElementsByTagName(badxml?"CATEGORY":"ms:CATEGORY");var category=get_textcontent(mscategory[0]);var cat=category;if(cls==="3")category="out";var label_category=category;if(category==='sd'){label_category='td';}
else if(category==='ss'){label_category='ts';}
else if(category==='ds'||category==='rem'||category==='db'||category==='lo'||category==='ptc'||category==='pt'||category==='ex'){label_category='rem';}
else if(category==='-999'){label_category='nam';}
if(!icons_data[category]){icons_data[category]=create_track_icon(zoomlevel,svgdata[category],cfg.selectmodel.indexOf('est')===0?null:hover_svgdata[category],category);}
var data=create_track_tooltip(cfg,markers[i],badxml,cls,category,cat,time,coords);if(cls==="2"&&has_hurricane_symbol!=stormnr){if(cfg.selectmodel.indexOf('est')===0){var curest_labelsize=get_curest_trackpoint_label_size(zoomlevel);labelstyle="label"+curest_labelsize+label_category+'curest';}
else{labelstyle="label"+labelsize+label_category+'cur';}
labeloffset=current_labeloffset;has_hurricane_symbol=stormnr;var hurricane_marker;if(category==='ds'||category==='rem'||category==='pt'||category==='ex'){var remIcon=create_remnants_icon(zoomlevel,svgdata['rem']);hurricane_marker=createTrackMarker(map,pt,remIcon,10000000,data_array,d);hurricane_marker.setMap(map);map.track_overlays.push(hurricane_marker);data.marker=hurricane_marker;}
else{var icons_hurr=pt.lat()>=0?hurr_icons:hurr_south_icons;hurricane_marker=createTrackMarker(map,pt,icons_hurr[0],10000000,data_array,d);hurricane_marker.setMap(map);hurricane_marker.icons=icons_hurr;data.marker=hurricane_marker;map.track_overlays.push(hurricane_marker);if(cfg.selectmodel.indexOf('est')===0&&zoomlevel<3){const circleicon=create_icon(80,svgdata_hurr_estofs[category],null,true);const circle=createTrackMarker(map,pt,circleicon,10000001);circle.setMap(map);map.track_overlays.push(circle);google.maps.event.addListener(circle,"click",function(){map.setCenter(circle.getPosition());map.setZoom(5);});}}}
else if(cls==="3"){if(cfg.selectmodel.indexOf('est')===0){labelstyle="label"+labelsize+label_category;}
if(wms_source&&!notrackpoints){var marker=createTrackMarker(map,pt,icons_data[category],900000);marker.setMap(map);map.track_overlays.push(marker);data.marker=marker;}}
else{labelstyle="label"+labelsize+label_category;if(wms_source&&!notrackpoints){var m=createTrackMarker(map,pt,icons_data[category],900000,data_array,d);m.setMap(map);map.track_overlays.push(m);data.marker=m;}}
data.data_template.labelstyle=labelstyle;data.labeloffset=labeloffset;markers_with_tooltip.push(data);if(cfg.selectmodel.indexOf('est')!==0){if(cls!=="3"){if((has_hurricane_symbol||zoomlevel>=4)&&!nolabels){var label=new ELabel({latlng:pt,label:time,classname:labelstyle,offset:labeloffset});label.setMap(map);map.track_overlays.push(label);}}}
else if(cls==='2'){var label=new ELabel({latlng:pt,label:stormname||stormnr,classname:labelstyle,offset:labeloffset});label.setMap(map);map.track_overlays.push(label);}
if(cls!=='2'&&zoomlevel<=6){if(i<markers.length-1&&get_class(markers[i+1],badxml)!=='2'&&i>0&&get_class(markers[i-1],badxml)!=='2'){++i;}}}
var url="/adcircrun/id="+layer_data.track;if(cfg.selectmodel.indexOf('est')==0){url="/adcircrun/model=est";}
$.get(cfg.django_base+url+'.trackpt',function(response){$.template('tooltip_trackpoint',response);$.each(markers_with_tooltip,function(){if(!this.labeloffset){this.labeloffset=new google.maps.Size(10,-9);}
if(this.marker){var embed=$.render(this.data_template,'tooltip_trackpoint');var tooltip=createTooltip(map,{marker:this.marker,content:embed,offset:{x:this.labeloffset.width,y:this.labeloffset.height}});tooltip.setMap(map);map.track_overlays.push(tooltip);}});});});}
function get_subtrack_stormdata(stormnr,json_subtracks)
{var stormdata=null;$.each(json_subtracks.data,function(){if(+this.value===+stormnr){stormdata=this;return false;}});return stormdata;}
function create_subtrack_points(map,cfg,wms_spec,zoomlevel,data_array,layer_data,json_subtracks)
{var wms_source=cfg.query_source;var notrackpoints=false;var labelsize=get_subtrack_label_size(zoomlevel);var subtrack_labeloffset=get_subtrack_labeloffset(zoomlevel)
var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=subtrack_points&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host);var svgpaths=get_svg_icons('subtrack_point',{'td':'td','ts':'ts','h1':'h1','h2':'h2','h3':'h3','h4':'h4','h5':'h5','sd':'td','ss':'ts','ds':'rem','rem':'rem','db':'rem','lo':'rem','ptc':'rem','pt':'rem','ex':'rem'});$.when(url_promise).done(function(xmlDoc){if(zoomlevel!==map.getZoom()){return;}
var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:subtrack_points");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"subtrack_points");}
if(!markers)
return;var markers_with_tooltip=[];for(var i=0;i<markers.length;++i){var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var coords=get_textcontent(gmlcoords[0]).split(",");var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));var cls=get_class(markers[i],badxml);var mscategory=markers[i].getElementsByTagName(badxml?"CATEGORY":"ms:CATEGORY");var category=get_textcontent(mscategory[0]);if(cls==="2"){var tzuc=cfg.timezone.toUpperCase();var mslabel=markers[i].getElementsByTagName(badxml?"TIME"+tzuc:"ms:TIME"+tzuc);if(mslabel.length===0){mslabel=markers[i].getElementsByTagName(badxml?"TIME":"ms:TIME");}
var time=get_textcontent(mslabel[0]);var data=create_track_tooltip(cfg,markers[i],badxml,cls,category,category,time,coords);var labelstyle="subtrack_label"+labelsize;var subtrackIcon=create_subtrack_icon(zoomlevel,svgpaths[category]);var marker=createTrackMarker(map,pt,subtrackIcon,900000);marker.setMap(map);map.track_or_invest_overlays.push(marker);data.marker=marker;var msstormnr=markers[i].getElementsByTagName(badxml?"STORMNR":"ms:STORMNR");var stormnr=get_textcontent(msstormnr[0]);var stormdata=get_subtrack_stormdata(stormnr,json_subtracks);if(stormdata&&stormdata.text){var label_text=stormdata.text;if(stormdata.com&&+stormdata.com!=+layer_data.com){label_text='<a href="'+window.location.pathname+'?com='+stormdata.com+'">'+stormdata.text+'</a>';}
var label=new ELabel({latlng:pt,label:label_text,classname:labelstyle,offset:subtrack_labeloffset});label.setMap(map);map.track_or_invest_overlays.push(label);data.trackid=stormdata.trackid;}
data.labeloffset=new google.maps.Size(10,-9);markers_with_tooltip.push(data);}}
$.each(markers_with_tooltip,function(){if(this.trackid){var this_=this;$.get(cfg.django_base+"/adcircrun/id="+this_.trackid+'.trackpt',function(response){$.template('tooltip_trackpoint',response);var embed=$.render(this_.data_template,'tooltip_trackpoint');var tooltip=createTooltip(map,{marker:this_.marker,content:embed,offset:{x:this_.labeloffset.width,y:this_.labeloffset.height}});tooltip.setMap(map);map.track_or_invest_overlays.push(tooltip);});}});});}
function create_track_invest(map,cfg,wms_spec,zoomlevel,layer_data){var filter='';if(cfg.selectmodel.indexOf('est')!==0&&cfg.selectmodel!=='dev'){filter='&Filter=<Filter><PropertyIsEqualTo><PropertyName>BASIN</PropertyName><Literal>Atlantic</Literal></PropertyIsEqualTo></Filter>';}
$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=invest&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host+filter,function(xmlDoc){if(zoomlevel!==map.getZoom())
return;var badxml=false;var invest=get_xml_tag(xmlDoc,"ms:invest");if(!invest||0===invest.length){badxml=true;invest=get_xml_tag(xmlDoc,"invest");}
if(!invest)
return;var invests=[];for(var i=0;i<invest.length;i++){var gmlpoly=invest[i].getElementsByTagName(badxml?"Polygon":"gml:Polygon");var gmlcoords=gmlpoly[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var msnum=invest[i].getElementsByTagName(badxml?"AREA":"ms:AREA");var mscategory=invest[i].getElementsByTagName(badxml?"RISK5DAY":"ms:RISK5DAY");var mspercent=invest[i].getElementsByTagName(badxml?"PROB5DAY":"ms:PROB5DAY");var msbasin=invest[i].getElementsByTagName(badxml?"BASIN":"ms:BASIN");var num=get_textcontent(msnum[0]);var cat=get_textcontent(mscategory[0]);var perc=get_textcontent(mspercent[0]);var basin=get_textcontent(msbasin[0]);var pts=get_points_from_xml(gmlcoords[0]);var xmin=pts[0].lng();var xmax=pts[0].lng();var ymin=pts[0].lat();var ymax=pts[0].lat();for(j=1;j<pts.length;j++){x=pts[j].lng();y=pts[j].lat();if(x<xmin){xmin=x;}
if(x>xmax){xmax=x;}
if(y<ymin){ymin=y;}
if(y>ymax){ymax=y;}}
var center_x=xmin-(xmin-xmax)/2;var center_y=ymin+(ymax-ymin)/2;var centerpt=new google.maps.LatLng(center_y,center_x);if(cat==='Low'){strokeColor='#FF0';}
else if(cat==='Medium'){strokeColor='#F90';}
else if(cat==='High'){strokeColor='#F00';}
var p=new google.maps.Polygon({path:pts,fillOpacity:0.1,strokeColor:strokeColor,strokeWeight:1.2,strokeOpacity:1,clickable:true,geodesic:true,map:map});p.setMap(map);map.track_or_invest_overlays.push(p);google.maps.event.addListener(p,"mouseout",function(){reset_cursor(map);});var labelsize='5';var labelstyle="invest_"+cat+' '+"invest"+zoomlevel;var labeltext=num+' ('+perc+')';var label=new ELabel({latlng:centerpt,label:labeltext,opacity:100,classname:labelstyle,offset:new google.maps.Size(0,0)});label.setMap(map);map.track_or_invest_overlays.push(label);var perc_str=perc.substr(0,2);if(perc_str[1]==='%')
perc_str=perc_str[0];invests.push({target:p,num:num,percent:perc_str,cat:cat,basin:basin});}
$.each(invests,function(){var this_=this;$.get(cfg.django_base+"/ceracgi/cera_invest_tooltip?id="+layer_data.com+"&investnr="+this_.num+"&perc="+this_.percent+"&cat="+this_.cat+"&data_host="+cfg.data_host+'&basin='+this_.basin,function(response){var tooltip=createTooltip(map,{marker:this_.target,content:response});tooltip.setMap(map);map.track_or_invest_overlays.push(tooltip);});});});}
function createStationMarker(map,point,icon,html,stationname,stationid,agency,cfg,zindexprocess,mapping)
{var opts={icon:icon.icon,anchorPoint:icon.infoWindowAnchor,position:point};if(zindexprocess)
opts.zIndex=zindexprocess;if(icon.icon.cursor)
opts.cursor=icon.icon.cursor;var marker=new google.maps.Marker(opts);if(html){google.maps.event.addListener(marker,"click",function(){var pix_coords=fromLatLngToPixel(map,point);pix_coords.x+=1;pix_coords.y-=marker.anchorPoint.y;openInfoWindow(map,fromPixelToLatLng(map,pix_coords),html,cfg);document.forms['mapform'].stationid.value=stationid;});}
if(icon.hover_icon){google.maps.event.addListener(marker,"mouseover",function(){marker.setIcon(icon.hover_icon);});}
google.maps.event.addListener(marker,"mouseout",function(){if(icon.hover_icon){marker.setIcon(opts.icon);}
reset_cursor(map);});if(stationname.length>0){if(agency==='NOAA_NOS'){agency='NOAA-NOS';}
else if(agency==='NOAA_RFS'){agency='NOAA-RFC';}
else if(agency==='CPRA_USACE'||agency==='CPRA_USGS'||agency==='CPRA_NOS'){agency='CPRA';}
else if(agency==='IOC-UNESCO'){agency='IOC-UNESCO';}
else if(agency==='STOFS'){agency='ESTOFS';}
if(agency===''){content=stationname;}
else if(mapping&&mapping[stationid]){content=stationname+" ("+mapping[stationid]+", "+agency+")";}
else{if(stationid.indexOf('STOFS_')===0){stationid=stationid.substr(6);}
content=stationname+" ("+stationid+", "+agency+")";}
var offsetx=icon.icon.scaledSize.width/4;if(icon.hover_icon){offsetx=icon.hover_icon.scaledSize.width/4;}
var tooltip=createTooltip(map,{marker:marker,content:content,cssClass:'marker_tooltip tooltip_stations',offset:{x:offsetx+2,y:0}});tooltip.setMap(map);map.station_tooltips.push(tooltip);}
return marker;}
function create_station_icon(zoomlevel,svgpath,hover_svgpaths,cfg)
{var iconsize=station_icon_zoom(zoomlevel);if(cfg.selectmodel=='ras'){iconsize=iconsize*0.8;}
return create_icon(iconsize,svgpath,hover_svgpaths,false,1.0,0.28);}
function showGaugeInfo(map,pt,icon,layer_data,stationid,stationname,agency,cfg,wms_spec,cls,zindex,mapping)
{var URL1=cfg.django_base+"/adcircrun/day="+layer_data.day+"/time="+layer_data.time+"/id="+layer_data.com+"/stationid="+stationid;URL1+="/cls="+cls+"/tz="+cfg.timezone+"/unit="+layer_data.unit+"/data_host="+layer_data.data_host+"/dev="+layer_data.dev+".html";var html='<iframe class="bubbleContent" frameBorder="0" border="0" framespacing="0" marginWidth="0" marginHeight="0" width="100%" scrolling="no" src="'+URL1+'"></iframe>';return createStationMarker(map,pt,icon,html,stationname,stationid,agency,cfg,zindex,mapping);}
function showWindInfo(map,pt,icon,layer_data,stationid,stationname,agency,cfg,wms_spec,zindex)
{var URL1=cfg.django_base+"/adcircrun/day="+layer_data.day+"/time="+layer_data.time+"/id="+layer_data.com+"/stationid="+stationid;URL1+="/tz="+cfg.timezone+"/unit="+layer_data.unit+"/data_host="+layer_data.data_host+"/dev="+layer_data.dev+".html";var html='<iframe class="bubbleContent" frameBorder="0" border="0" framespacing="0" marginWidth="0" marginHeight="0" width="100%" scrolling="no" src="'+URL1+'"></iframe>';return createStationMarker(map,pt,icon,html,stationname,stationid,agency,cfg,zindex);}
function showWaveInfo(map,pt,icon,layer_data,stationid,stationname,agency,cfg,wms_spec,zindex)
{var URL1=cfg.django_base+"/adcircrun/day="+layer_data.day+"/time="+layer_data.time+"/id="+layer_data.com+"/stationid="+stationid;URL1+="/tz="+cfg.timezone+"/unit="+layer_data.unit+"/data_host="+layer_data.data_host+"/dev="+layer_data.dev+".wave_html";var html='<iframe class="bubbleContent" frameBorder="0" border="0" framespacing="0" marginWidth="0" marginHeight="0" width="100%" scrolling="no" src="'+URL1+'"></iframe>';return createStationMarker(map,pt,icon,html,stationname,stationid,agency,cfg,zindex);}
function getXmlAsString(xml)
{return xml;}
function get_svgpaths(data)
{var svgpaths={};$.each(data,function(){svgpaths[this.cls]=getXmlAsString(this.data);});return svgpaths;}
var svg_station_colors={'cyan':'#00ffff','grey':'#0000ff','white':'#DDDF0D','green':'#4ea67a','orange':'#ff6600','yellow':'#2DDE00'};var svg_track_points_colors={'td':'#3565FF','ts':'#5EBBFF','h1':'#FFFFBA','h2':'#FFCC00','h3':'#FF8800','h4':'#FF5000','h5':'#CC0000','rem':'#99CCCC'};var svg_track_timestep_colors={'inactive':'#660000','active':'#ff0000'};var svg_colors={'stations':svg_station_colors,'stations_hover':svg_station_colors,'stations_trigger':svg_station_colors,'stations_trigger_hover':svg_station_colors,'track_points':svg_track_points_colors,'track_points_hover':svg_track_points_colors,'subtrack_point':{'td':'#3565FF','ts':'#5EBBFF','h1':'#FFFFBA','h2':'#FFEC78','h3':'#FF9900','h4':'#FF5000','h5':'#CC0000','rem':'#99CCCC'},'track_points_out':{'out':'#666666'},'track_timestep':svg_track_timestep_colors,'track_timestep_hover':svg_track_timestep_colors,'hurr_estofs':svg_track_points_colors};var hurr_angles={'hurr_global':[360,0,-10],'hurr_south_global':[0,360,10]};var svg_paths=null;function create_svgpaths(svg_data)
{var svg_paths={};$.each(svg_data,function(){var svg_path_data=getXmlAsString(this.data);if(svg_path_data){var svg_replaced_paths={};if(svg_colors[this.cls]){$.each(svg_colors[this.cls],function(key,value){svg_replaced_paths[key]=svg_path_data.replaceAll('#f0f',value);});}
if(hurr_angles[this.cls]){var idx=0;var angle=hurr_angles[this.cls][0];while(angle!=hurr_angles[this.cls][1]){svg_replaced_paths[idx++]=svg_path_data.replace('rotate(0.0','rotate('+angle);angle+=hurr_angles[this.cls][2];}}
else{svg_replaced_paths[this.cls]=svg_path_data}
svg_paths[this.cls]=svg_replaced_paths;}});return svg_paths;}
function get_svg_icons(topic,svg_mappings)
{var svgpaths={};if(svg_paths[topic]){$.each(svg_mappings,function(key,value){svgpaths[key]=svg_paths[topic][value];});}
return svgpaths;}
function get_all_svg_icons(topic){var svgpaths={};$.each(svg_paths[topic],function(key,value){svgpaths[key]=value;});return svgpaths;}
function read_svg_icons(svg_url,svg_mappings)
{var def=$.Deferred();$.get(svg_url,function(data){var result=[];$.each(svg_mappings,function(cls,color){var svg=$('#'+color,data)
result.push({cls:cls,data:svg.html()});});def.resolve(result);});return def.promise();}
class cluster_renderer{render({count,position},stats){const color=count>Math.max(10,stats.clusters.markers.mean)?"#ff0000":"#9644a6";const svg=window.btoa(`<svg fill="${color}"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 240 240"><circle cx="120"cy="120"opacity=".7"r="70"/><circle cx="120"cy="120"opacity=".3"r="90"/></svg>`);return new google.maps.Marker({position,icon:{url:`data:image/svg+xml;base64,${svg}`,scaledSize:new google.maps.Size(45,45),},label:{text:String(count),color:"rgba(255,255,255,0.9)",fontSize:"12px",},zIndex:Number(google.maps.Marker.MAX_ZINDEX)+count,});}}
function create_gauge_stations(map,cfg,wms_spec,layer_data,zoomlevel,agency,create_markers,prop_check,idx)
{if(zoomlevel!==map.getZoom())
return;var filter='';var criteria=agency;if(agency==='other')
criteria='';if(agency!=='hydro'){if(agency==='noaa_nos'){filter="&Filter=<Filter><OR><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>NOAA_NOS</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>TCOON</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>PRSN</Literal></PropertyIsEqualTo></OR></Filter>";}
else if(agency==='cpra'){filter="&Filter=<Filter><OR>"+"<PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>CPRA</Literal></PropertyIsEqualTo>"+"<PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>CPRA_USGS</Literal></PropertyIsEqualTo>"+"<PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>CPRA_USACE</Literal></PropertyIsEqualTo>"+"<PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>CPRA_NOS</Literal></PropertyIsEqualTo>"+"</OR></Filter>";}
else{filter="&Filter=<Filter><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>"+criteria.toUpperCase()+"</Literal></PropertyIsEqualTo></Filter>";}}
var def=$.Deferred();var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=hydro&debug="+cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host+filter);var stationid_mapping_promise;if(agency==='cpra'){stationid_mapping_promise=$.get(cfg.django_base+'/adcircrun/agency='+agency+'.stationid_chart');}
var station_mappings={'1':'cyan','2':'cyan','3':'grey','4':'white','5':'white','7':'green'};var svgpaths=get_svg_icons('stations',station_mappings);var hover_svgpaths=get_svg_icons('stations_hover',station_mappings);var trigger_svgpaths=svgpaths;var trigger_hover_svgpaths=hover_svgpaths;if(agency==='cpra'){trigger_svgpaths=get_svg_icons('stations_trigger',station_mappings);if(Object.keys(trigger_svgpaths).length==0){trigger_svgpaths=svgpaths;}
trigger_hover_svgpaths=get_svg_icons('stations_trigger_hover',station_mappings);if(Object.keys(trigger_hover_svgpaths).length==0){trigger_hover_svgpaths=hover_svgpaths;}}
var symbols_classes=[];$.each($('[name^=cls]',$('#hydro_symbols')),function(){$.each($(this).attr('name').split('_'),function(index,value){if(value!='cls'){symbols_classes.push(value);}});});var icons_data={};var trigger_icons_data={};$.when(url_promise,stationid_mapping_promise).done(function(xml,stationid_mapping){if(zoomlevel!==map.getZoom()){return;}
var xmlDoc=xml[0];var mapping=stationid_mapping?stationid_mapping[0]:null;var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:hydro");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"hydro");}
var has_stations=false;if(markers){for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){has_stations=true;break;}}}
var $agency=$('#'+agency);if(!has_stations){if(agency!=='hydro')
$agency.hide();return;}
if(agency!=='hydro'){if(agency==='cpra'&&cfg.selectmodel!=='cpra'){$agency.hide();$('#cpra_symbol').hide();return;}
if(!$agency.is(":visible")){$("#hydro_desc").show();$("#hydro_symbols").show();$agency.show();if(prop_check){$('input:checkbox[value='+agency+']').prop('checked',true);}}}
if(!create_markers){return;}
var agency_;for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var msstationid=markers[i].getElementsByTagName(badxml?"STATIONID":"ms:STATIONID");var msstname=markers[i].getElementsByTagName(badxml?"STNAME":"ms:STNAME");var msagency=markers[i].getElementsByTagName(badxml?"AGENCY":"ms:AGENCY");var mstrigger=markers[i].getElementsByTagName(badxml?"TRIGGER":"ms:TRIGGER");var coords=get_textcontent(gmlcoords[0]).split(",");var stationid=get_textcontent(msstationid[0]);var stationname=get_textcontent(msstname[0]);var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));agency_=get_textcontent(msagency[0]);var stationtrigger='0';if(agency==='cpra'&&mstrigger.length!=0){stationtrigger=get_textcontent(mstrigger[0]);}
var icon_data;var base_zindex=10000;if(stationtrigger==='1'){if(!trigger_icons_data[cls]){icon_data=trigger_icons_data[cls]=create_station_icon(zoomlevel,trigger_svgpaths[cls],trigger_hover_svgpaths[cls],cfg);}
else{icon_data=trigger_icons_data[cls];}
base_zindex=100000;}
else if(!icons_data[cls]){icon_data=icons_data[cls]=create_station_icon(zoomlevel,svgpaths[cls],hover_svgpaths[cls],cfg);}
else{icon_data=icons_data[cls];}
var gauge_marker=showGaugeInfo(map,pt,icon_data,layer_data,stationid,stationname,agency_,cfg,wms_spec,cls,base_zindex+idx,mapping);if(agency_.toLowerCase()==='cpra_usace'||agency_.toLowerCase()==='cpra_usgs'||agency_.toLowerCase()==='cpra_nos')
agency_='cpra';if(!agency_||agency_.length===0||agency==='hydro'||agency_.toLowerCase()==='tcoon'||agency_.toLowerCase()==='prsn')
agency_=agency;map.gauge_overlays[agency_.toLowerCase()].push(gauge_marker);if(cfg.stationid&&cfg.stationid.length!==0&&(cfg.stationid==stationid||'STOFS_'+cfg.stationid==stationid)){google.maps.event.trigger(gauge_marker,"click");cfg.stationid='';}}}
if(!agency_||agency_.length===0||agency==='hydro'||agency_.toLowerCase()==='tcoon'||agency_.toLowerCase()==='prsn')
agency_=agency;var markers=map.gauge_overlays[agency_.toLowerCase()];var options={map:map,markers:markers,renderer:new cluster_renderer(),algorithm:new markerClusterer.SuperClusterAlgorithm({maxZoom:1,minPoints:3})};map.marker_clusters[agency_.toLowerCase()]=new markerClusterer.MarkerClusterer(options);}).always(function(){def.resolve();});return def.promise();}
function create_wind_stations(map,cfg,wms_spec,layer_data,zoomlevel,agency,create_markers,prop_check,idx)
{if(zoomlevel!==map.getZoom())
return;var criteria=agency;if(agency==='other')
criteria='';var wind_pos=criteria.indexOf('wind_');if(wind_pos===0){criteria=criteria.substr(5);}
var def=$.Deferred();var filter="&Filter=<Filter><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>"+
criteria.toUpperCase()+"</Literal></PropertyIsEqualTo></Filter>";if(agency==='noaa_nos'){var filter="&Filter=<Filter><OR><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>NOAA_NOS</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>TCOON</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>PRSN</Literal></PropertyIsEqualTo></OR></Filter>";}
var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=wind&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host+filter);var station_mappings={'1':'orange','2':'orange','3':'grey','4':'white','5':'white'};var svgpaths=get_svg_icons('stations',station_mappings);var hover_svgpaths=get_svg_icons('stations_hover',station_mappings);var symbols_classes=[];$.each($('[name^=cls]',$('#wind_symbols')),function(){$.each($(this).attr('name').split('_'),function(index,value){if(value!='cls'){symbols_classes.push(value);}});});var icons_data={};$.when(url_promise).done(function(xmlDoc){if(zoomlevel!==map.getZoom()){return;}
var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:wind");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"wind");}
var has_stations=false;if(markers){for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){has_stations=true;break;}}}
var $agency=$('#wind_'+agency);if(!has_stations){if(agency!=='wind')
$agency.hide();return;}
if(!$agency.is(":visible")){$("#wind_desc").show();$("#wind_symbols").show();$agency.show();if(prop_check){$('input:checkbox[value='+agency+']').prop('checked',true);}}
if(!create_markers){return;}
for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var msstationid=markers[i].getElementsByTagName(badxml?"STATIONID":"ms:STATIONID");var msstname=markers[i].getElementsByTagName(badxml?"STNAME":"ms:STNAME");var msagency=markers[i].getElementsByTagName(badxml?"AGENCY":"ms:AGENCY");var coords=get_textcontent(gmlcoords[0]).split(",");var stationid=get_textcontent(msstationid[0]);var stationname=get_textcontent(msstname[0]);var agency_=get_textcontent(msagency[0]);var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));if(!icons_data[cls]){icons_data[cls]=create_station_icon(zoomlevel,svgpaths[cls],hover_svgpaths[cls],cfg);}
var wind_marker=showWindInfo(map,pt,icons_data[cls],layer_data,stationid,stationname,agency_,cfg,wms_spec,10000+idx);wind_marker.setMap(map);if(!agency_||agency_.length===0||agency_.toLowerCase()==='tcoon'||agency_.toLowerCase()==='prsn')
agency_=agency;map.wind_overlays[agency_.toLowerCase()].push(wind_marker);if(cfg.stationid&&cfg.stationid.length!==0&&cfg.stationid===stationid){google.maps.event.trigger(wind_marker,"click");cfg.stationid='';}}}}).always(function(){def.resolve();});return def.promise();}
function create_wave_stations(map,cfg,wms_spec,layer_data,zoomlevel,agency,create_markers,prop_check,idx)
{if(zoomlevel!==map.getZoom())
return;var criteria=agency;if(agency==='other')
criteria='';var wave_pos=criteria.indexOf('wave_');if(wave_pos===0){criteria=criteria.substr(5);}
var def=$.Deferred();var filter="&Filter=<Filter><PropertyIsEqualTo><PropertyName>AGENCY</PropertyName><Literal>"+
criteria.toUpperCase()+"</Literal></PropertyIsEqualTo></Filter>";var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=wave&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host+filter);var station_mappings={'1':'yellow','2':'yellow','3':'grey','4':'white','5':'white'};var svgpaths=get_svg_icons('stations',station_mappings);var hover_svgpaths=get_svg_icons('stations_hover',station_mappings);var symbols_classes=[];$.each($('[name^=cls]',$('#wave_symbols')),function(){$.each($(this).attr('name').split('_'),function(index,value){if(value!='cls'){symbols_classes.push(value);}});});var icons_data={};$.when(url_promise).done(function(xmlDoc){if(zoomlevel!==map.getZoom()){return;}
var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:wave");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"wave");}
var has_stations=false;if(markers){for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){has_stations=true;break;}}}
var $agency=$('#wave_'+agency);if(!has_stations){if(agency!=='wave')
$agency.hide();return;}
if(!$agency.is(":visible")){$("#wave_desc").show();$("#wave_symbols").show();$agency.show();if(prop_check){$('input:checkbox[value='+agency+']').prop('checked',true);}}
if(!create_markers){return;}
for(var i=0;i<markers.length;i++){var cls=get_class(markers[i],badxml);if(symbols_classes.indexOf(cls)!==-1){var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var msstationid=markers[i].getElementsByTagName(badxml?"STATIONID":"ms:STATIONID");var msstname=markers[i].getElementsByTagName(badxml?"STNAME":"ms:STNAME");var msagency=markers[i].getElementsByTagName(badxml?"AGENCY":"ms:AGENCY");var coords=get_textcontent(gmlcoords[0]).split(",");var stationid=get_textcontent(msstationid[0]);var stationname=get_textcontent(msstname[0]);var agency_=get_textcontent(msagency[0]);var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));if(!icons_data[cls]){icons_data[cls]=create_station_icon(zoomlevel,svgpaths[cls],hover_svgpaths[cls],cfg);}
var wave_marker=showWaveInfo(map,pt,icons_data[cls],layer_data,stationid,stationname,agency_,cfg,wms_spec,10000+idx);wave_marker.setMap(map);if(!agency_||agency_.length===0)
agency_=agency;map.wave_overlays[agency_.toLowerCase()].push(wave_marker);if(cfg.stationid&&cfg.stationid.length!==0&&cfg.stationid===stationid){google.maps.event.trigger(wave_marker,"click");cfg.stationid='';}}}}).always(function(){def.resolve();});return def.promise();}
function get_points_from_xml(xmlnode)
{var coords=$.trim(get_textcontent(xmlnode)).split(" ");var pts=[];$.each(coords,function(){if(this.length){var coord=this.split(",");if(coord.length===2){var x=parseFloat(coord[0]),y=parseFloat(coord[1]);if(!isNaN(x)&&!isNaN(y))
pts.push(new google.maps.LatLng(y,x));}}});return pts;}
function create_track_lines(map,cfg,wms_spec,layer_name,color,not_cls3_color,stroke_weight,filter,subtrack)
{stroke_weight=stroke_weight||2;filter=filter||'';var current_zoom=map.getZoom();$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME="+layer_name+"&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host+filter,function(xmlDoc){if(current_zoom!==map.getZoom())
return;var badxml=false;var lines=get_xml_tag(xmlDoc,"ms:"+layer_name);if(!lines||0===lines.length){badxml=true;lines=get_xml_tag(xmlDoc,layer_name);}
if(!lines)
return;for(var i=0;i<lines.length;i++){var cls=get_class(lines[i],badxml);var gmllinestring=lines[i].getElementsByTagName(badxml?"LineString":"gml:LineString");var gmlcoords=gmllinestring[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var col=color;if(cls!=="3"&&cls!=='0')
col=not_cls3_color;var p=new google.maps.Polyline({path:get_points_from_xml(gmlcoords[0]),strokeColor:col,strokeWeight:stroke_weight,strokeOpacity:1,clickable:true,geodesic:true,map:map});p.setMap(map);if(subtrack){map.track_or_invest_overlays.push(p);}
else{map.track_overlays.push(p);}}});}
function create_track_line(map,cfg,wms_spec)
{create_track_lines(map,cfg,wms_spec,"track_lines",'#666','#770000',1.7);}
function create_maintrack(map,cfg,wms_spec)
{var filter="&Filter=<Filter><PropertyIsEqualTo><PropertyName>CLASS</PropertyName><Literal>1</Literal></PropertyIsEqualTo></Filter>";create_track_lines(map,cfg,wms_spec,"maintrack",'#DC0000','#DC0000',1.7,filter);}
function create_subtrack_line(map,cfg,wms_spec)
{create_track_lines(map,cfg,wms_spec,"subtrack_lines",'#666','#666',1.7,null,true);}
function create_cone(map,cfg,wms_spec,newlevel)
{var current_zoom=map.getZoom();if(cfg.selectmodel!=="best"){$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=coneoutline&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host,function(xmlDoc){if(current_zoom!==map.getZoom())
return;var badxml=false;var polygones=get_xml_tag(xmlDoc,"ms:coneoutline");if(!polygones||0===polygones.length){badxml=true;polygones=get_xml_tag(xmlDoc,"coneoutline");}
if(!polygones)
return;$.each(polygones,function(){var gmllinestring=this.getElementsByTagName(badxml?"Polygon":"gml:Polygon");var gmlcoords=gmllinestring[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var p=new google.maps.Polyline({path:get_points_from_xml(gmlcoords[0]),strokeColor:"#222",strokeWeight:1,strokeOpacity:1,clickable:false,geodesic:true,map:map});p.setMap(map);map.track_overlays.push(p);});});};}
function get_latlong(xmlnode)
{var coord=get_textcontent(xmlnode).split(",");return new google.maps.LatLng(parseFloat(coord[1]),parseFloat(coord[0]));}
function get_datetime(xmlnode)
{return get_textcontent(xmlnode);}
function get_track_points(map,cfg,wms_spec)
{var current_zoom=map.getZoom();$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=track_ani&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host,function(xmlDoc){if(current_zoom!==map.getZoom())
return;var badxml=false;var points=get_xml_tag(xmlDoc,"ms:track_ani");if(!points||0===points.length){badxml=true;points=get_xml_tag(xmlDoc,"track_ani");}
if(!points)
return;map.track_ani_points=[];$.each(points,function(){var gmlpoint=this.getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var gmltime=this.getElementsByTagName(badxml?"DATETIME":"ms:DATETIME");map.track_ani_points.push({latlng:get_latlong(gmlcoords[0]),daytime:get_datetime(gmltime[0])});});});}
String.repeat=function(chr,count){var str="";for(var x=0;x<count;x++){str+=chr;}
return str;};String.prototype.padL=function(width,pad){if(!width||width<1)
return this;if(!pad)pad=" ";var length=width-this.length;if(length<1)return this.substr(0,width);return(String.repeat(pad,length)+this).substr(0,width);};String.prototype.padR=function(width,pad){if(!width||width<1)
return this;if(!pad)pad=" ";var length=width-this.length;if(length<1)this.substr(0,width);return(this+String.repeat(pad,length)).substr(0,width);};Date.prototype.formatDate=function(format){var date=this;if(!format)
format="MM/dd/yyyy";var month=date.getMonth()+1;var year=date.getFullYear();format=format.replace("MM",month.toString().padL(2,"0"));if(format.indexOf("yyyy")>-1)
format=format.replace("yyyy",year.toString());else if(format.indexOf("yy")>-1)
format=format.replace("yy",year.toString().substr(2,2));format=format.replace("dd",date.getDate().toString().padL(2,"0"));var hours=date.getHours();if(format.indexOf("t")>-1){if(hours>11)
format=format.replace("t","pm");else
format=format.replace("t","am");}
if(format.indexOf("HH")>-1)
format=format.replace("HH",hours.toString().padL(2,"0"));if(format.indexOf("hh")>-1){if(hours>12)hours-12;if(hours===0)hours=12;format=format.replace("hh",hours.toString().padL(2,"0"));}
if(format.indexOf("mm")>-1)
format=format.replace("mm",date.getMinutes().toString().padL(2,"0"));if(format.indexOf("ss")>-1)
format=format.replace("ss",date.getSeconds().toString().padL(2,"0"));return format;};function create_timestep_marker(map,point,icon,data_array,datetime,date,time,is_current,category,cls,labelsize,zoomlevel)
{var opts={icon:icon.icon,anchorPoint:icon.infoWindowAnchor,position:point,clickable:!is_current,optimized:icon.optimized?true:false,zIndex:is_current?990000:800000};var marker=new google.maps.Marker(opts);if(!is_current){google.maps.event.addListener(marker,"click",function(){select_timestep_layer(map,date);});if(icon.hover_icon){google.maps.event.addListener(marker,"mouseover",function(){marker.setIcon(icon.hover_icon);});}
google.maps.event.addListener(marker,"mouseout",function(){if(icon.hover_icon){marker.setIcon(opts.icon);}
reset_cursor(map);});if(category==='ds'||category==='db'||category==='lo'||category==='pt'||category==='ex'||category==='ptc'){category='rem';}
else if(category==='-999'){category='namtimestep';}
var labeloffset=get_labeloffset(zoomlevel);if(cls==='1'||cls==='0'){var labelsizecss='label'+labelsize+category;var tooltip=createTooltip(map,{marker:marker,content:time,cssClass:'marker_tooltip tooltip_timesteps '+labelsizecss,offset:{x:labeloffset.width,y:labeloffset.height}});tooltip.setMap(map);map.overlays.push(tooltip);}}
return marker;}
function create_timestep_icon(zoomlevel,svgpath,hover_svgpath)
{return create_icon(track_timesteps_icon_zoom(zoomlevel),svgpath,hover_svgpath,true);}
function create_track_timesteps_points(map,cfg,wms_spec,data_array,zoomlevel,current_only)
{var labelsize=get_trackpoint_label_size(zoomlevel);var url_promise=$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=track_timesteps&debug="+
cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host);var track_timestep_mappings={'1':'inactive','2':'active'};var svgpaths=get_svg_icons('track_timestep',track_timestep_mappings);var hover_svgpaths=get_svg_icons('track_timestep_hover',track_timestep_mappings);var icons_data={};$.when(url_promise).done(function(xmlDoc){if(zoomlevel!==map.getZoom()){return;}
var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:track_timesteps");if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,"track_timesteps");}
if(!markers)
return;var layer=get_current_layer();var theme=get_theme(data_array,layer);if(layer.indexOf('shp')!==-1)
theme=theme+'shp';var current=null;if(layer===theme){var datetime=$('#timestep_'+theme).val();current=$.datepicker.parseDate('yymmdd',datetime.substring(0,8));if(current)current.setHours(parseInt(datetime.substring(9,11)));}
$.each(markers,function(){var gmlpoint=this.getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var coords=get_textcontent(gmlcoords[0]).split(",");var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));var msdatetime=this.getElementsByTagName(badxml?"DATETIME":"ms:DATETIME");var datetime=get_textcontent(msdatetime[0]);var d=$.datepicker.parseDate('yymmdd',datetime.substring(0,8));d.setHours(parseInt(datetime.substring(9,11)));var tzuc=cfg.timezone.toUpperCase();var mstime=this.getElementsByTagName(badxml?"TIME"+tzuc:"ms:TIME"+tzuc);if(mstime.length===0){mstime=this.getElementsByTagName(badxml?"TIME":"ms:TIME");}
var time=get_textcontent(mstime[0]);var mscategory=this.getElementsByTagName(badxml?"CATEGORY":"ms:CATEGORY");var category=get_textcontent(mscategory[0]);var msclass=this.getElementsByTagName(badxml?"CLASS":"ms:CLASS");var cls=get_textcontent(msclass[0]);var iscurrent=current&&(+d===+current);var marker;if(!current_only){if(!icons_data[1]){icons_data[1]=create_timestep_icon(zoomlevel,svgpaths[1],hover_svgpaths[1]);}
marker=create_timestep_marker(map,pt,icons_data[1],data_array,datetime,d,time,false,category,cls,labelsize,zoomlevel);marker.setMap(map);map.track_overlays.push(marker);}
if(iscurrent){if(!icons_data[2]){icons_data[2]=create_timestep_icon(zoomlevel,svgpaths[2],hover_svgpaths[2]);}
marker=create_timestep_marker(map,pt,icons_data[2],data_array,datetime,d,time,true,category,cls,labelsize,zoomlevel);marker.setMap(map);map.track_overlays_active.push(marker);}});});}
function create_planning_marker(map,point,icon,stationname,zindexprocess)
{var opts={icon:icon.icon,anchorPoint:icon.infoWindowAnchor,position:point};if(zindexprocess)
opts.zIndex=zindexprocess;var marker=new google.maps.Marker(opts);google.maps.event.addListener(marker,"mouseout",function(){reset_cursor(map);});var tooltip=createTooltip(map,{marker:marker,content:stationname,cssClass:'marker_tooltip tooltip_stations',offset:{x:10,y:0}});tooltip.setMap(map);map.overlays.push(tooltip);return marker;}
function planning_icon_zoom(zoomlevel,cfg){if(zoomlevel<=7){zoom="5";}
else if(zoomlevel===8||zoomlevel===9){zoom="6";}
else if(zoomlevel===10||zoomlevel===11){zoom="7";}
else if(zoomlevel>=12){zoom="8";}
return zoom;}
function create_planning_icon(zoomlevel,layername,cfg)
{zoom=planning_icon_zoom(zoomlevel);var x={'watint':0,'water':1,'transport':2,'health':3,'energy':4,'emergency':5,'telecom':6};var planning_icon={url:cfg.basepath+'/_images/planning'+zoom+"_sprite.png",size:new google.maps.Size(15,15),origin:new google.maps.Point(x[layername]*15,0),anchor:new google.maps.Point(7,8)};return{icon:planning_icon,imageMap:new Array(1,1,1,15,15,15,15,1),infoWindowAnchor:new google.maps.Point(8,8)};}
function create_planning_points(map,cfg,wms_spec,zoomlevel,layername)
{var spinner=new Spinner().spin(map.getDiv());$.get(cfg.django_base+cfg.ceracgi_wfs_base_path+wms_spec+"&SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME="+layername+"&debug="+cfg.debug+"&selectmodel="+cfg.selectmodel+"&data_host="+cfg.data_host,function(xmlDoc){if(zoomlevel!==map.getZoom())
return;var badxml=false;var markers=get_xml_tag(xmlDoc,"ms:"+layername);if(!markers||0===markers.length){badxml=true;markers=get_xml_tag(xmlDoc,layername);}
if(!markers)
return;for(var i=0;i<markers.length;i++){var msname=markers[i].getElementsByTagName(badxml?"Name":"ms:Name");var name=get_textcontent(msname[0]);var gmlpoint=markers[i].getElementsByTagName(badxml?"Point":"gml:Point");var gmlcoords=gmlpoint[0].getElementsByTagName(badxml?"coordinates":"gml:coordinates");var coords=get_textcontent(gmlcoords[0]).split(",");var pt=new google.maps.LatLng(parseFloat(coords[1]),parseFloat(coords[0]));var marker=create_planning_marker(map,pt,create_planning_icon(zoomlevel,layername,cfg),name);marker.setMap(map);map[layername+'_overlays'].push(marker);}
spinner.stop();}).fail(function(){spinner.stop();});}// Copyright (c) 2006-2014 Carola Kaiser, Louisiana State University

function remove_exclamation_mark(s){if(s[0]==='!'){return s.substr(1);}
return s;}
function get_login_next_url(cfg){var form=document.forms['mapform'];var url=cfg.baseurl+'?'+'tz='+remove_exclamation_mark(form.tz.value)+'&'+'unit='+remove_exclamation_mark(form.unit.value)+'&'+'panel='+remove_exclamation_mark(form.panel.value)+'&'+'track_labels='+remove_exclamation_mark(form.track_labels.value)+'&'+'maptype='+$('input[name=maptype]:checked').val();if(cfg.selectmodel==='best'){if($.cookie('cera-best-disclaimer')==='1'){url=url+'&best_accept=1';}}
else if($.cookie('cera-disclaimer')==='1'){url=url+'&accept=1';}
return'next='+encodeURIComponent(url);}
function no_cookies_dialog(cfg){$.get(cfg.basepath+'/_controls/cookies_failed.html',function(response){var $dialog_parent=$('.disclaimer');$dialog_parent.html(response);var $cookies_failed=$("#cookies_failed");show_dialog($cookies_failed,cfg);$cookies_failed.dialog("option","buttons",{"Ok":function(){$(this).dialog("close");}});});}
function login_onclick(){var cfg=get_config_data();if(cookies_enabled()){var href=window.location.protocol+'//'+window.location.host+cfg.django_base+'/accounts/login/';var url=get_login_next_url(cfg);var back_url=get_page_url(map,get_data_array(cfg));if(back_url.length!==0){url=url+'&back='+encodeURIComponent(back_url);}
window.open(href+'?'+url,'_self');}
else{no_cookies_dialog(cfg);}
return false;}
function write_cera_cookie(cfg,name,value,expires,path)
{if(cfg.selectmodel==='best'){if($.cookie("cera-best-disclaimer")!=='1'){return;}}
else if($.cookie("cera-disclaimer")!=='1'){return;}
if(value&&$.cookie(name)!==value){$.cookie(name,value,{expires:expires,path:path});}}
function show_dialog($dialogContent,cfg,width,height){$dialogContent.dialog({open:function(event,ui){$('.ui-dialog-titlebar-close').removeAttr('title');},modal:true,width:width?width:'355px',maxHeight:height?height:'auto',create:function(event,ui){var widget=$(this).dialog("widget");$(".ui-dialog-titlebar-close span",widget).removeClass("ui-icon-closethick").addClass("form_close");},close:function(event,ui){$(this).dialog("destroy").remove();}});}
function btnTabInfo_form(cfg)
{var href=window.location.protocol+'//'+window.location.host+window.location.pathname+'?';var model='#tabinfoContent_'+cfg.selectmodel;if(cfg.selectmodel!="cpra"&&!cfg.selectmodel.includes('dev')){$(".modelmenu_info").show();$("#btnTabInfo").click(function(){var $tabform=$('#dialogForm');$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find(model).appendTo($tabform);var $tabinfoContent=$(model);$tabinfoContent.attr('title');show_dialog($tabinfoContent,cfg,'700px',$(window).height()-10);});});}}
function get_page_url(map,data)
{update_url(map);var url=$('form[name=mapform] > :button,:radio,:checkbox,:input[name!=csrfmiddlewaretoken][name!=search_input]:not([name~=accept])').serialize();url=url.replace(/%2C/g,',');var current_layer0=get_checked_layer0(data);var pos=current_layer0?current_layer0.indexOf('_auto'):-1;if(pos!==-1&&url.indexOf('layer0='+current_layer0)===-1)
url=url.replace('layer0='+current_layer0.substring(0,pos),'layer0='+current_layer0);return url;}
function tinyurl(cfg,href,url,cb,path){var deferred=$.Deferred();var url_promise=deferred.promise();$.get(cfg.django_base+'/ceracgi/cera_shorten_url?server='+href+'&'+url,function(resp){cb&&cb(resp);deferred.resolve(resp);}).fail(function(){var resp=href+'/';if(path){resp+=path+'/';}
resp+='?'+url;cb&&cb(resp);deferred.resolve(resp);});return url_promise;}
function show_linkform($linkform,cfg,href,map,data)
{var url=get_page_url(map,data);$('#long-url-hidden',$linkform).val(url);$('#long-url',$linkform).val(href+url);$('input[type=checkbox]',$linkform).prop('checked',true);tinyurl(cfg,href,url,function(d){$('#long-url',$linkform).val(d);});$('.success_msg',$linkform).hide();$linkform.dialog("open");}
function btnLink_form(map,data,cfg)
{var href=window.location.protocol+'//'+window.location.host+window.location.pathname+'?';$("#btnLink").click(function(){var $linkform=$('#dialogForm');$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#linktoolsContent').appendTo($linkform);var $linktoolsContent=$("#linktoolsContent");$linktoolsContent.dialog({modal:true,width:'355px',autoOpen:false,open:function(event,ui){$('.ui-dialog-titlebar-close').removeAttr('title');},create:function(event,ui){var widget=$(this).dialog("widget");$(".ui-dialog-titlebar-close span",widget).removeClass("ui-icon-closethick").addClass("form_close");},close:function(event,ui){$(this).dialog("destroy").remove();}});var $url_disp=$('#long-url',$linktoolsContent);var $url_hidden=$('#long-url-hidden',$linktoolsContent);var $check=$('input[type=checkbox]',$linktoolsContent);$check.click(function(e){$('.success_msg',$linktoolsContent).hide();var is_checked=$(this).is(':checked');e.stopPropagation();if(is_checked){tinyurl(cfg,href,$url_hidden.val(),function(d){$url_disp.val(d);});}
else{$url_disp.val(href+$url_hidden.val());}});show_linkform($linktoolsContent,cfg,href,map,data);var clipboard=new Clipboard('#btnCopy');clipboard.on('success',function(e){console.log(e);$('.success_msg',$linktoolsContent).show();});clipboard.on('error',function(e){console.log(e);$('.error_msg',$linktoolsContent).show();});});});}
function download(url,data,method)
{if(url&&data){data=typeof data==='string'?data:$.param(data);var inputs='';$.each(data.split('&'),function(){var pair=this.split('=');inputs+='<input type="hidden" name="'+pair[0]+'" value="'+pair[1]+'" />';});$('<form action="'+url+'" method="'+(method||'post')+'">'+inputs+'</form>').appendTo('body').submit().remove();}}
function btnDwnl_form(data,cfg,wms_spec_data)
{$("#btnDwnl").click(function(){var $dialogForm=$('#dialogForm');$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#downloadContent').appendTo($dialogForm);var $downloadContent=$("#downloadContent");show_dialog($downloadContent,cfg);var current_layer0_data=get_checked_layer0_data(data);var current_layer0;if(current_layer0_data){var title=$downloadContent.dialog("option","title");$downloadContent.dialog("option","title",title.format(current_layer0_data.header.format('')));current_layer0=current_layer0_data.name;}
if(current_layer0=="maxelevshp"){$('.title_maxelev').show();}
var $poly_inun=$('#poly_inun');if(current_layer0&&current_layer0.indexOf('inun')!==-1){$poly_inun.hide();}
else{$("#ShpPoly").click(function(){$downloadContent.dialog("close");download_shp_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
if(cfg.selectmodel=='best'){$('#dwnl_points').hide();}
else{$("#ShpPoints").click(function(){$downloadContent.dialog("close");download_shppoints_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
if(current_layer0.indexOf('maxinun')==-1||!cfg.is_main_track){$('#tif_inun').hide();}
else{$("#tif").click(function(){$downloadContent.dialog("close");download_tif_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
if(cfg.selectmodel=='best'){$('#dwnl_csv').hide();}
else{$("#csv").click(function(){$downloadContent.dialog("close");download_csv_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
var $netcdf_inun=$('#netcdf_inun');if((cfg.selectmodel=='est')||(cfg.selectmodel=='estdev')||(cfg.selectmodel=='schism')||(cfg.selectmodel=='schismdev')||(cfg.selectmodel=='best')){$netcdf_inun.hide();}
else{if(current_layer0&&current_layer0.indexOf('inun')!==-1){$netcdf_inun.hide();}
else{$("#NetCDF").click(function(){$downloadContent.dialog("close");check_fileformat($dialogForm,cfg,wms_spec_data,current_layer0);});}}
if(cfg.selectmodel!='fema'){if(current_layer0&&current_layer0.indexOf('elev')!==-1){$('#dwnl_hydro').show();$("#hydrographs").click(function(){$downloadContent.dialog("close");download_hydro_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
else{$('#dwnl_hydro').hide();};}
else{$('#dwnl_hydro').hide();}
if(cfg.selectmodel=='ras'){$downloadContent.children().hide();$('#rasHDF5,#desc').show();$("#HDF5").click(function(){$downloadContent.dialog("close");download_hdf5_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
else{$('#rasHDF5').hide();}
if(cfg.selectmodel=='best'){$('#dwnl_dat').show();$("#dat").click(function(){$downloadContent.dialog("close");download_dat_form($dialogForm,cfg,wms_spec_data,current_layer0);});}
else{$('#dwnl_dat').hide();}});});}
function download_form_cookie($parent,cfg,wms_spec_data,current_layer0,formtag,openform)
{var deferred=$.Deferred();var cookie_promise=deferred.promise();if(cfg.selectmodel==='best'){if($.cookie('cera-best-disclaimer')==='1'){deferred.resolve('1');return cookie_promise;}}
else if($.cookie('cera-disclaimer')==='1'){deferred.resolve('1');return cookie_promise;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find(formtag).appendTo($parent);var $form=$(formtag);show_dialog($form,cfg);$form.dialog("option","buttons",{"Accept":function(){if(cfg.selectmodel==='best'){write_cera_cookie(cfg,'cera-best-disclaimer','1',30,'/');}
else{write_cera_cookie(cfg,'cera-disclaimer','1',30,'/');}
$(this).dialog("close");deferred.resolve('1');openform($parent,cfg,wms_spec_data,current_layer0);},"Cancel":function(){$(this).dialog("close");deferred.resolve('0');}});});return cookie_promise;}
function download_shp_form($shpform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.shp_source+$.param(wms_spec_data)+'&layer='+current_layer0+'&data_host='+cfg.data_host+'&develop=1';$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_shp_form_cookie($shpform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#shpPolygonsContent').appendTo($shpform);var $shpPolygonsContent=$("#shpPolygonsContent");show_dialog($shpPolygonsContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$shpPolygonsContent.dialog("close");},failCallback:function(){$shpPolygonsContent.dialog("close");$(response).find('#shpPolygonsFailed').appendTo($shpform);show_dialog($("#shpPolygonsFailed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#shpPolygonsFailed').appendTo($shpform);show_dialog($('#shpPolygonsFailed'),cfg);});});}
function download_shp_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#shpPolygonsCookie',download_shp_form);}
function download_shppoints_form($shppointsform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.shppoints_source+$.param(wms_spec_data)+'&layer='+current_layer0+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_shppoints_form_cookie($shppointsform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#ShpPointsContent').appendTo($shppointsform);var $ShpPointsContent=$("#ShpPointsContent");show_dialog($ShpPointsContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$ShpPointsContent.dialog("close");},failCallback:function(){$ShpPointsContent.dialog("close");$(response).find('#ShpPointsFailed').appendTo($shppointsform);show_dialog($("#ShpPointsFailed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#ShpPointsFailed').appendTo($shppointsform);show_dialog($('#ShpPointsFailed'),cfg);});});}
function download_shppoints_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#ShpPointsCookie',download_shppoints_form);}
function download_tif_form($tifform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var tif_layer=current_layer0
if(current_layer0.includes("shp")){tif_layer=current_layer0.substring(0,current_layer0.length-3);}
var url=cfg.tif_source+$.param(wms_spec_data)+'&layer='+tif_layer+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_tif_form_cookie($tifform,cfg,wms_spec_data,tif_layer);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#tifContent').appendTo($tifform);var $tifContent=$("#tifContent");show_dialog($tifContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$tifContent.dialog("close");},failCallback:function(){$tifContent.dialog("close");$(response).find('#tifFailed').appendTo($tifform);show_dialog($("#tifFailed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#tifFailed').appendTo($tifform);show_dialog($('#tifFailed'),cfg);});});}
function download_tif_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#tifCookie',download_tif_form);}
function download_csv_form($csvform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.csv_source+$.param(wms_spec_data)+'&layer='+current_layer0+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_csv_form_cookie($csvform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#csvContent').appendTo($csvform);var $csvContent=$("#csvContent");show_dialog($csvContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$csvContent.dialog("close");},failCallback:function(){$csvContent.dialog("close");$(response).find('#csvFailed').appendTo($csvform);show_dialog($('#csvFailed'),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#csvFailed').appendTo($csvform);show_dialog($('#csvFailed'),cfg);});});}
function download_csv_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#csvCookie',download_csv_form);}
function download_netcdf_ascii($netcdfform,cfg,wms_spec_data,current_layer0,response,content)
{show_dialog($netcdfform,cfg);$('#btnSave',$netcdfform).click(function(){var url=cfg.netcdf_source+$.param(wms_spec_data)+'&layer='+current_layer0+'&data_host='+cfg.data_host;$.fileDownload(url,{successCallback:function(){$netcdfform.dialog("close");},failCallback:function(){$netcdfform.dialog("close");$(response).find('#netcdftoolsFailed').appendTo($netcdfform);show_dialog($('#netcdftoolsFailed'),cfg);}});});}
function check_fileformat($netcdfform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.netcdf_format_source+$.param(wms_spec_data)+'&layer='+current_layer0+'&data_host='+cfg.data_host;$.get(url,function(response){spinner.stop();var cookie_set=download_netcdf_form_cookie($netcdfform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
if(response.indexOf('ascii')>=0)
content='#netcdftoolsFileformat';else
content='#netcdftoolsContent';$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find(content).appendTo($netcdfform);download_netcdf_ascii($(content),cfg,wms_spec_data,current_layer0,response,content);});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#netcdftoolsFailed').appendTo($netcdfform);show_dialog($('#netcdftoolsFailed'),cfg);});});}
function download_netcdf_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#netcdfCookie',check_fileformat);}
function download_hydro_form($hydroform,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.hydro_source+$.param(wms_spec_data)+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_hydro_form_cookie($hydroform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#hydroContent').appendTo($hydroform);var $hydroContent=$("#hydroContent");show_dialog($hydroContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$hydroContent.dialog("close");},failCallback:function(){$hydroContent.dialog("close");$(response).find('#hydroFailed').appendTo($hydroform);show_dialog($("#hydroFailed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#hydroFailed').appendTo($hydroform);show_dialog($('#hydroFailed'),cfg);});});}
function download_hydro_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#hydroCookie',download_hydro_form);}
function download_hdf5_form($hdf5form,cfg,wms_spec_data,current_layer0)
{var spinner=new Spinner().spin(map.getDiv());var url=cfg.hdf5_source+$.param(wms_spec_data)+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_hdf5_form_cookie($hdf5form,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#hdf5Content').appendTo($hdf5form);var $hdf5Content=$("#hdf5Content");show_dialog($hdf5Content,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$hdf5Content.dialog("close");},failCallback:function(){$hdf5Content.dialog("close");$(response).find('#hdf5Failed').appendTo($hdf5form);show_dialog($("#hdf5Failed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#hdf5Failed').appendTo($hdf5form);show_dialog($('#hdf5Failed'),cfg);});});}
function download_hdf5_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#hdf5Cookie',download_hdf5_form);}
function download_dat_form($datform,cfg,wms_spec_data,current_layer0){var spinner=new Spinner().spin(map.getDiv());var url=cfg.dat_source+$.param(wms_spec_data)+'&data_host='+cfg.data_host;$.get(url+'&check=1',function(){spinner.stop();var cookie_set=download_dat_form_cookie($datform,cfg,wms_spec_data,current_layer0);cookie_set.then(function(value){if(value!=='1'){return;}
$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#datContent').appendTo($datform);var $datContent=$("#datContent");show_dialog($datContent,cfg);$('#btnSave').click(function(){$.fileDownload(url,{successCallback:function(){$datContent.dialog("close");},failCallback:function(){$datContent.dialog("close");$(response).find('#datFailed').appendTo($datform);show_dialog($("#datFailed"),cfg);}});});});});}).fail(function(){spinner.stop();$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#datFailed').appendTo($datform);show_dialog($('#datFailed'),cfg);});});}
function download_dat_form_cookie($form,cfg,wms_spec_data,current_layer0)
{return download_form_cookie($form,cfg,wms_spec_data,current_layer0,'#datCookie',download_dat_form);}
function btnSettings_form(cfg)
{$("#btnSettings").click(function(){var $settingsform=$('#dialogForm');$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#settingsContent').appendTo($settingsform);var $settingsContent=$("#settingsContent");show_dialog($settingsContent,cfg);var selectmodel_default=$.cookie('cera-model');if(!selectmodel_default||selectmodel_default.length===0){selectmodel_default=cfg.selectmodel;}
else if(selectmodel_default==='pub'){selectmodel_default='est';}
else if(selectmodel_default==='nc_ng'){selectmodel_default='asgs';}
if(cfg.isauthenticated){$("#select_asgs_label").show();$("#select_asgs").selectmenu().val(selectmodel_default).selectmenu('refresh');}
if(cfg.selectmodel!=='est'&&cfg.selectmodel!=='estdev'&&cfg.selectmodel!=='dev'&&cfg.selectmodel!=='fema'){$("#select_tz_label").show();$("#select_tz").selectmenu().val(cfg.timezone).selectmenu('refresh');}
$("#select_unit").selectmenu().val(cfg.unit).selectmenu('refresh');$("#show_tracklabels").prop("checked",cfg.track_labels==='1');if(cfg.asgs!=='pub'&&cfg.asgs!=='pl'){$("#show_setting_cookie").show();}
$('#btnSave').click(function(){var tzval=$("#select_tz").val();if(cfg.isauthenticated&&cfg.timezone!=tzval){write_cera_cookie(cfg,'cera-timezone-'+cfg.asgs,tzval,30,'/');}
else{tzval='';}
var unitval=$("#select_unit").val();if(cfg.unit!=unitval){write_cera_cookie(cfg,'cera-unit-'+cfg.asgs,unitval,30,'/');}
else{unitval='';}
var asgsval=$("#select_asgs").val();if(selectmodel_default!=asgsval){if(cfg.isauthenticated&&asgsval!=='ri'&&asgsval!=='pl'){cfg.asgs=cfg.selectmodel=asgsval;if(cfg.asgs==='asgs'){cfg.asgs='nc_ng';}
write_cera_cookie(cfg,'cera-model',cfg.asgs,30,'/');}}
var track_labelsval=$("#show_tracklabels").prop("checked")?'1':'0';if(track_labelsval!=cfg.track_labels){cfg.track_labels=track_labelsval;write_cera_cookie(cfg,'cera-track-labels',cfg.track_labels,30,'/');}
else{track_labelsval='';}
$settingsContent.dialog("close");selectTimezoneUnitEtAl(tzval,unitval,track_labelsval);});});});}
function btnHelp_form(cfg)
{$("#btnHelp").click(function(){var $helpform=$('#dialogForm');$.get(cfg.basepath+'/_controls/link_tools.html',function(response){$(response).find('#helpContent').appendTo($helpform);var $helpContent=$("#helpContent");$helpContent.attr('title','Help and Information');show_dialog($helpContent,cfg);});});}
function btnInfo_form(cfg,wms_spec_data)
{$("#btnInfo").click(function(){var $infoform=$('#dialogForm');$.get(cfg.django_base+'/adcircrun/id='+wms_spec_data.com+'/dev='+(cfg.dev_site?cfg.dev_site:'0')+'/asgs='+cfg.asgs+'.desc',function(response){$(response).find('#infoContent').appendTo($infoform);var $infoContent=$("#infoContent");$infoContent.attr('title','Model Run Information');show_dialog($infoContent,cfg);});});}
function footerdisclaimer_form(cfg,wms_spec_data){$("#footer_disclaimer").click(function(){var $info_form=$('#dialogForm');$.get(cfg.django_base+'/adcircrun/id='+wms_spec_data.com+'.footer_disclaimer',function(response){$(response).find('#infoContent').appendTo($info_form);var $infoContent=$("#infoContent");$infoContent.attr('title','Data Disclaimer');show_dialog($infoContent,cfg,'500px',$(window).height()-10);});});}
function footer_data_form(cfg,wms_spec_data){$("#footer_data").click(function(){var $info_form=$('#dialogForm');$.get(cfg.django_base+'/adcircrun/id='+wms_spec_data.com+'.datacopyright',function(response){$(response).find('#infoContent').appendTo($info_form);var $infoContent=$("#infoContent");$infoContent.attr('title','Data Info');show_dialog($infoContent,cfg,'500px',$(window).height()-10);});});}
function footer_credits_form(cfg){$("#footer_credits").click(function(){var $info_form=$('#dialogForm');$.get(cfg.basepath+'/_controls/footer_credits.html',function(response){$(response).find('#infoContent').appendTo($info_form);var $infoContent=$("#infoContent");$infoContent.attr('title','Credits');show_dialog($infoContent,cfg,'610px',$(window).height()-10);});});}
var old_resize;function set_map_height(cfg)
{var outerHei=$(window).height()-83;$('#outer').height(outerHei);var main=outerHei-60;$('#main').height(main);$('#map').height(main);$('#legend').height(main-2);if(old_resize)
old_resize();}
function enable_tooltips($tooltips)
{$tooltips.qtip({show:{event:'mouseover'},hide:{event:'click mouseout'},style:{classes:'qtip-default',tip:{width:15}},position:{my:'top center',at:'bottom center',viewport:$(window),adjust:{method:'shift flipinvert'}},overwrite:true});}
function enable_tooltips_controls($tooltips)
{$tooltips.qtip({show:{event:'mouseover'},hide:{event:'click mouseout'},style:{classes:'qtip-default',tip:{width:15}},position:{my:'left center',at:'right center'},overwrite:true});}
function enable_tooltip_legend($tooltips)
{$tooltips.qtip({show:{event:'mouseover'},hide:{event:'click mouseout'},style:{classes:'qtip-default',tip:{width:15}},position:{my:'right center',at:'left center'},overwrite:true});}
function init_zoom_data()
{data={};for(i=5;i<=13;++i){var buttons=$('button[zoomlimit='+i+']');var radios=$('input[zoomlimit='+i+']:radio');var checkboxes=$('input[id^="timesteps_"][zoomlimit='+i+']:checkbox');data[i]={buttons:buttons,radios:radios,checkboxes:checkboxes};}
return data;}
function enable_controls(map)
{var zoom=map.getZoom();var data=init_zoom_data();for(i=5;i<=13;++i){var disable=zoom>i;if(disable&&data[i].buttons.attr('disabled_title'))
$.each(data[i].buttons,function(){$(this).attr('title',$(this).attr('disabled_title'));});else if(data[i].buttons.attr('enabled_title'))
$.each(data[i].buttons,function(){$(this).attr('title',$(this).attr('enabled_title'));});data[i].buttons.button('option','disabled',disable);if(disable){data[i].radios.hide().next().hide().next().show();data[i].checkboxes.hide();}
else{data[i].radios.show().next().show().next().hide();data[i].checkboxes.show();}}}
function get_theme(data,layer)
{var l=layer;var theme='';$.each(data,function(){if(this.name===l){theme=this.theme||this.name;return false;}});return theme;}
function needs_timestep_markers(data)
{var $layer=$('[type="radio"][name=layer0]:checked');if(!$layer)return false;var theme=get_theme(data,$layer.val());if(theme.length===0)return false;var $theme=$('[type="radio"][name=layer0][value='+theme+']');if(!$theme)return false;if($theme.length!==0)return true;$theme=$('[type="radio"][name=layer0][value='+theme+'shp]');if(!$theme)return false;return $theme.length!==0;}
function init_dynamic_data_reload(map,cfg,wms_spec,data,layer_data,com_has_adv,is_hindcast,json,has_main_track,init_animation)
{clearMapOverlays(map);if(map.hurricane_marker&&map.hurricane_marker.timer)
clearInterval(map.hurricane_marker.timer);if(init_animation){init_animation();}
if(cfg.check.trackline){if(!init_animation){create_cone(map,cfg,wms_spec,map.getZoom());if(needs_timestep_markers(data)){create_track_timesteps_points(map,cfg,wms_spec,data,map.getZoom());}}
create_track_line(map,cfg,wms_spec);create_track_labels(map,cfg,wms_spec,map.getZoom(),init_animation,data,layer_data);if(has_main_track)
create_maintrack(map,cfg,wms_spec);}
enable_controls(map);enable_tooltips($('.tooltip[title]'));if(!init_animation){var idx=0;if((cfg.check.hydro||cfg.check.wind||cfg.check.wave)&&(is_checked_theme(data,"elev")||is_checked_theme(data,"inun")||is_checked_theme(data,"ras"))){cfg.check.hydro=true;$('input:checkbox[name=layer5]').prop('checked',true);$.each(cfg.check.agencies_hydro,function(key,value){create_gauge_stations(map,cfg,wms_spec,layer_data,map.getZoom(),key,value,value,++idx);});}
if((cfg.check.hydro||cfg.check.wind||cfg.check.wave)&&is_checked_theme(data,"wvel")){idx=0;cfg.check.wind=true;$('input:checkbox[name=layer7]').prop('checked',true);$.each(cfg.check.agencies_wind,function(key,value){create_wind_stations(map,cfg,wms_spec,layer_data,map.getZoom(),key,value,value,++idx);});}
if((cfg.check.hydro||cfg.check.wind||cfg.check.wave)&&is_checked_theme(data,"hsign")){idx=0;cfg.check.wave=true;$('input:checkbox[name=layer8]').prop('checked',true);$.each(cfg.check.agencies_wave,function(key,value){create_wave_stations(map,cfg,wms_spec,layer_data,map.getZoom(),key,value,value,++idx);});}
var planning_layers=['watint','water','transport','health','energy','emergency','telecom'];$.each(planning_layers,function(index,key){if(cfg.check[key]){create_planning_points(map,cfg,wms_spec,map.getZoom(),key);}});if(cfg.check.invest_or_subtrack){if(json.layers.track_invest){create_track_invest(map,cfg,wms_spec,map.getZoom(),layer_data);}
if(json.subtracks&&json.subtracks.data&&json.subtracks.data.length>0){create_subtrack_line(map,cfg,wms_spec);create_subtrack_points(map,cfg,wms_spec,map.getZoom(),data,layer_data,json.subtracks);}}}}
function has_agencies(agency_checks)
{var flag=false;$.each(agency_checks,function(key,value){if(value){flag=true;return false;}});return flag;}
function init_dynamic_data(map,cfg,wms_spec,data,layer_data,com_has_adv,is_hindcast,json,has_main_track,init_animation)
{if(init_animation){init_animation();get_track_points(map,cfg,wms_spec);google.maps.event.addListener(map,"dragend",function(){init_animation();});}
google.maps.event.addListener(map,"zoom_changed",function(){init_dynamic_data_reload(map,cfg,wms_spec,data,layer_data,com_has_adv,is_hindcast,json,has_main_track,init_animation);});if(cfg.check.trackline){if(!init_animation){create_cone(map,cfg,wms_spec,map.getZoom());if(needs_timestep_markers(data)){create_track_timesteps_points(map,cfg,wms_spec,data,map.getZoom());}}
create_track_line(map,cfg,wms_spec);create_track_labels(map,cfg,wms_spec,map.getZoom(),init_animation,data,layer_data);if(has_main_track)
create_maintrack(map,cfg,wms_spec);}
if(!init_animation){var planning_layers=['watint','water','transport','health','energy','emergency','telecom'];$.each(planning_layers,function(index,key){if(cfg.check[key]){create_planning_points(map,cfg,wms_spec,map.getZoom(),key);}});if(cfg.check.invest_or_subtrack){if(json.layers.track_invest){create_track_invest(map,cfg,wms_spec,map.getZoom(),layer_data);}
if(json.subtracks&&json.subtracks.data&&json.subtracks.data.length>0){create_subtrack_line(map,cfg,wms_spec);create_subtrack_points(map,cfg,wms_spec,map.getZoom(),data,layer_data,json.subtracks);}}}}
function find_current_timestep(data,layer)
{var timestep='';$.each(data,function(){if(this.name===layer){timestep=this.timestep;return false;}});return timestep;}
function set_current_timestep(data,layer,timestep)
{$.each(data,function(){if(this.name===layer){this.timestep=timestep;return false;}});}
function no_griddomain(json,cfg)
{if(json.grid.name.toLowerCase()==='hsofs'||json.grid.name.toLowerCase()==='ec95d'||cfg.asgs==='best'){return true;}
return false;}
function initialize_map(data,cfg,json,wms_spec_data,layer_data,com)
{if(no_griddomain(json,cfg)){set_checked(data,'griddomain',false);}
map.wms_spec_data=wms_spec_data;map.layer_data=layer_data;map.data=data;map.com=com;initialize_custom_gmap(map,wms_spec_data,data,cfg,com.has_adv);initialize_custom_gmap_alt(map,wms_spec_data,data,cfg);var cfg_=cfg;old_resize=window.onresize;window.onresize=function(){set_map_height(cfg_);};google.maps.event.addDomListener(window,"resize",function(){google.maps.event.trigger(map,"resize");});var url2=cfg.django_base+"/adcircrun/id={0}.maplogo";$.get(url2.format(wms_spec_data.com),function(response){$('.maplogo').html(response);enable_tooltips_controls($('.tooltip_logo[title]'));});}
function initialize_plain_map(cfg,data)
{set_map_height(cfg);map=initialize_plain_gmap(cfg,data);var deferred=$.Deferred();var map_promise=deferred.promise();google.maps.event.addListenerOnce(map,'idle',function(){deferred.resolve();});return map_promise;}
function fill_combobox_timesteps(combobox,data,first,preselect,no_default_preselect,timezone)
{if(!data)return"";var index=-1;var selected_text;var selected_value;var count_values=0;$.each(data,function(i){if(!this.nodata){var text=this.text;if(timezone!=='utc'){if(this.texts_tz){text=this.texts_tz[timezone]||this.text;}
else{text=this.text_tz||this.text;}}
if(text&&text.length>0)
addoption(combobox,text,this.value);if(this.selected||preselect&&this.value===preselect){index=i;selected_text=text;selected_value=this.value;}
++count_values;}});if(!no_default_preselect&&-1===index){if(count_values>0)
index=first?0:count_values-1;}
if(index!==-1){combobox.selectedIndex=index;if(selected_text){data[index].selected_text=selected_text;data[index].selected_value=selected_value;}
else{data[index].selected_text=data[index].text;if(timezone!=='utc')
data[index].selected_text=data[index].text_tz||data[index].text;data[index].selected_value=data[index].value;}
return data[index];}
return null;}
function initialize_dynamic_data(data,cfg,wms_spec,layer_data,com_has_adv,is_hindcast,json,has_main_track)
{if(cfg.anilayer&&cfg.anilayer.length){init_dynamic_data(map,cfg,wms_spec,data,layer_data,com_has_adv,is_hindcast,json,has_main_track,function(){if(map.progressbar){map.progressbar.remove();map.progressbar=null;}
var progressbar=new progressBar(map,{width:300,height:20,loadstring:'Retrieving Animation ...'},cfg);progressbar.setMap(map);map.progressbar=progressbar;var layer=cfg.anilayer;layer_data.layer=cfg.anilayer;$.getJSON(cfg.django_base+"/ceracgi/cera_timesteps_cgi",layer_data,function(timesteps_json){var timestep=find_current_timestep(data,layer);var $cb=$("select[name='timestep_"+cfg.anilayer+"']").get(0);var $textbox=$("#slider_text_"+cfg.anilayer).get(0);var $slider=$("#slider_"+cfg.anilayer);fill_combobox_timesteps($cb,timesteps_json.layers,true,timestep,false,cfg.timezone);map.timesteps_json_layers=timesteps_json.layers;var num_valid_layers=0;$.each(timesteps_json.layers,function(){if(!this.nodata)
++num_valid_layers;});progressbar.start(num_valid_layers);map.ani_ovl=initialize_animation(map,"ovl",cfg,wms_spec,json.grid.bbox,timesteps_json.layers,layer,$textbox,$cb,function(pos){$slider.progressbar("option","value",100*(pos/(num_valid_layers-1)));});});});}
else{init_dynamic_data(map,cfg,wms_spec,data,layer_data,com_has_adv,is_hindcast,json,has_main_track);}}
function load_arrow_images(cfg)
{}
function create_stations(stationtype,map,cfg,wms_spec,layer_data,agency,flag,prop_check,idx)
{if(stationtype==='hydro')
return create_gauge_stations(map,cfg,wms_spec,layer_data,map.getZoom(),agency,flag,prop_check,idx);if(stationtype==='wave')
return create_wave_stations(map,cfg,wms_spec,layer_data,map.getZoom(),agency,flag,prop_check,idx);return create_wind_stations(map,cfg,wms_spec,layer_data,map.getZoom(),agency,flag,prop_check,idx);}
function handle_layers(map,cfg,wms_spec,layer_data,data,agency,flag,create_markers,prop_check,idx,name,stationtype)
{cfg.check['agencies_'+stationtype][agency]=flag&&create_markers;clearStationOverlays(stationtype,map,agency);var $layer=$('input:checkbox[name='+name+']');if(flag){cfg.check[stationtype]=true;set_checked(data,stationtype,true);$layer.prop('checked',true);}
else if(!$('input:checkbox[name^="'+name+'_"]').filter(':checked').filter(':visible').length){cfg.check[stationtype]=false;set_checked(data,stationtype,false);$layer.prop('checked',false);}
return create_stations(stationtype,map,cfg,wms_spec,layer_data,agency,create_markers,prop_check,idx);}
function find_agency(cfg,val,stationtype)
{var idx=0;var result=-1;$.each(cfg.check['agencies_'+stationtype],function(key,value){++idx;if(val===key){result=idx;}});return result;}
function startSpinner(map)
{return new Spinner().spin(map.getDiv());}
function stopSpinner(spinner,promises)
{if(!promises){spinner.stop();}
else if(!$.isArray(promises)){$.when(promises).then(function(){spinner.stop();});}
else if(promises.length!==0){$.when.apply($,promises).then(function(){spinner.stop();});}
else{spinner.stop();}}
function manageSpinner(map,f)
{var spinner=startSpinner(map);try{stopSpinner(spinner,f());}
catch(err){spinner.stop();console.log(err);}}
function accordion_active(stationtype,flag)
{var $accordion_section=$(".ui-accordion-header > a[href$=#"+stationtype+"]");var active=$accordion_section.parent().hasClass('ui-state-active');if(!flag&&active||flag&&!active){$accordion_section.click();}}
function handle_station_layers(map,cfg,wms_spec,layer_data,data,name,stationtype,flag,switched_to_layer)
{var $layers=$('input:checkbox[name^="'+name+'_"]');var $main_layer=$('input:checkbox[name="'+name+'"]');cfg.check[stationtype]=flag;set_checked(data,stationtype,flag);var promises=[];var enable_main_layer=false;$layers.each(function(){var agency=$(this).val();var enable_agency=(cfg.check['agencies_'+stationtype][agency]&&flag)||switched_to_layer;$(this).prop('checked',enable_agency);if(enable_agency){enable_main_layer=true;}
var idx=find_agency(cfg,agency,stationtype);var p=handle_layers(map,cfg,wms_spec,layer_data,data,agency,flag,enable_agency,enable_agency,idx,name,stationtype);if(p){promises.push(p);}});if(enable_main_layer){$main_layer.prop('checked',true);}
accordion_active(stationtype,flag);return promises;}
function init_station_layers(map,cfg,wms_spec,layer_data,data,name,stationtype)
{if(cfg.isdefault){var sub_control_checked=false;$.each(cfg.check['agencies_'+stationtype],function(key,value){if(value){sub_control_checked=true;}});cfg.check[stationtype]=sub_control_checked;}
var $layers=$('input:checkbox[name^="'+name+'_"]');$('input:checkbox[name='+name+']').change(function(){var flag=$(this).prop('checked');$layers.each(function(){var agency=$(this).val();cfg.check['agencies_'+stationtype][agency]=flag;});manageSpinner(map,function(){return handle_station_layers(map,cfg,wms_spec,layer_data,data,name,stationtype,flag);});});$layers.click(function(){var flag=$(this).prop('checked');var agency=$(this).val();var idx=find_agency(cfg,agency,stationtype);manageSpinner(map,function(){return handle_layers(map,cfg,wms_spec,layer_data,data,agency,flag,flag,false,idx,name,stationtype);});});}
function init_station_panels(map,cfg,wms_spec,layer_data,data)
{init_station_layers(map,cfg,wms_spec,layer_data,data,'layer5','hydro');init_station_layers(map,cfg,wms_spec,layer_data,data,'layer7','wind');init_station_layers(map,cfg,wms_spec,layer_data,data,'layer8','wave');}
function handle_station_panels(map,cfg,wms_spec,layer_data,data)
{var was_enabled=cfg.check.hydro||cfg.check.wind||cfg.check.wave;var promises=[];if(is_checked_theme(data,"elev")||is_checked_theme(data,"ras")){$("#hydro").show();$("#wind").hide();$("#wave").hide();promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer5','hydro',was_enabled,was_enabled&&!cfg.check.hydro));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer7','wind'));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer8','wave'));}
else if(is_checked_theme(data,"wvel")){$("#hydro").hide();$("#wind").show();$("#wave").hide();promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer5','hydro'));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer7','wind',was_enabled,was_enabled&&!cfg.check.wind));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer8','wave'));}
else if(is_checked_theme(data,"hsign")){$("#hydro").hide();$("#wind").hide();$("#wave").show();promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer5','hydro'));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer7','wind'));promises.concat(handle_station_layers(map,cfg,wms_spec,layer_data,data,'layer8','wave',was_enabled,was_enabled&&!cfg.check.wave));}
else{$("#hydro").hide();$("#wind").hide();$("#wave").hide();}
return promises;}
function handle_station_panels_spinner(map,cfg,wms_spec,layer_data,data)
{manageSpinner(map,function(){return handle_station_panels(map,cfg,wms_spec,layer_data,data);});}
function set_header(header_template,grid_datum_text)
{$("#header_layer").html(header_template.format(" above "+grid_datum_text)).show();}
function set_header_timestep(com_track,header_template,selected_text,grid_datum_text)
{var $header_layer=$("#header_layer");var header;if(com_track&&com_track.indexOf("t88")===0){header=header_template.format(' above '+grid_datum_text)+', '+selected_text;$header_layer.html(header).show();}
else{var space=selected_text.indexOf(' ');var tim=selected_text.substring(0,space);var d=$.datepicker.parseDate('d-M-yy',tim);d=$.datepicker.formatDate("D, dd-M-yy",d);header=header_template.format(' above '+grid_datum_text)+' on {0}, {1}';$header_layer.html(header.format(d,selected_text.substring(space))).show();}}
function init_stations_list_url(cfg,wms_spec_data,storm_info_data,cb)
{var params={day:wms_spec_data.day,time:wms_spec_data.time,com:wms_spec_data.com,tz:wms_spec_data.tz,unit:wms_spec_data.unit,data_host:cfg.data_host,selectmodel:cfg.selectmodel,path:'stations',redirect:0};if(storm_info_data){params.storm=storm_info_data.storm.text;params.stormnr=storm_info_data.storm.value;params.advisory=storm_info_data.advisory.text;params.track=storm_info_data.track.value;params.grid=storm_info_data.com.text;}
const href=window.location.protocol+'//'+window.location.host+cfg.django_base+'?';tinyurl(cfg,href,$.param(params),cb,params.path);}
function init_besttrack_info_url(cfg,storm_info_data)
{var storm=storm_info_data.storm.text;var storm_name=storm.charAt(0)+storm.slice(1).toLowerCase();var stormnr=storm_info_data.storm.value;var year=storm_info_data.year.value;if(stormnr<10){stormnr="0"+stormnr;}
const nhc='https://www.nhc.noaa.gov/data/tcr/AL'+stormnr+year+'_'+storm_name+'.pdf';$('#nhcrep').attr('href',nhc);com=storm_info_data.com.value;const wiki=cfg.django_base+'/adcircrun/com='+com+'.wikilink';$.get(wiki,function(resp){$('#wiki').attr('href',resp);});}
function besttrack_info_links(cfg,storm_info_data)
{if(cfg.selectmodel==='best'){init_besttrack_info_url(cfg,storm_info_data);}}
function load_legend(data,cfg,wms_spec_data,layer_data,storm_info_data,json,current_layer0,com,is_hindcast,has_main_track)
{var legend_deferred=$.Deferred();var timestep_deferred=$.Deferred();var grid_datum=json.grid.datum;map.grid_datum=grid_datum;if(!current_layer0)current_layer0='';var params="id="+layer_data.com+"/tz="+layer_data.tz+"/layer="+current_layer0+"/dev=";if(layer_data.dev)
params=params+layer_data.dev;params=params+"/unit="+layer_data.unit;$.get(cfg.django_base+"/adcircrun/"+params+".html",function(response){var $header_layer=$("#header_layer");if(com.track&&com.track.indexOf("t88")===0){$("#header_time").remove();var $daymenu=$("#daymenu");$daymenu.datepicker("option","dateFormat","---");$daymenu.val("---");}
$header_layer.hide().html();$('#legendtree').html(response);var $treeaccordion=$(".treeaccordion");$treeaccordion.accordion({heightStyle:'content',collapsible:true,active:false,beforeActivate:function(e,ui){$('.legendimage').each(function(){var src=$(this).attr('src');if(!src||src.length===0)
$(this).attr('src',$(this).attr('name')).show();});$("select[name^='timestep_']:not(select[name='timestep_"+cfg.anilayer+"'])",ui.newPanel).each(function(){var this_=this;var $cb=$(this).get(0);var layer=$cb.name.substring(9);layer_data.layer=layer;layer_data.tz=cfg.timezone;layer_data.data_host=cfg.data_host;$.getJSON(cfg.django_base+"/ceracgi/cera_timesteps_cgi",layer_data,function(json){var timestep=find_current_timestep(data,layer);if(is_checked(data,layer)&&(timestep.length===0||timestep[0]==='[')&&json.layers.length!==0){timestep=json.layers[0].value;set_current_timestep(data,layer,timestep);}
var selected=fill_combobox_timesteps($cb,json.layers,true,timestep,false,cfg.timezone);$(this_).selectmenu({change:function(){if(layer==="precimg"){selectPrecipitation($cb,map);}
else{selectTimestep($cb,map,layer);}}});map.timesteps_json_layers=json.layers;$(this_).selectmenu("menuWidget").css('max-height','218px');load_arrow_images(cfg);if(cfg.dev_site&&cfg.dev_site!=='0'){if(selected&&selected.valid){$('#timestep_'+layer+'_valid').html(selected.valid);}}
else if(selected){var text=selected.valid;if(cfg.timezone!=='utc'){if(selected.valids_tz){text=selected.valids_tz[cfg.timezone]||this.valid;}
else{text=selected.valid_tz||this.valid;}}
$('#timestep_'+layer+'_valid').html(text);}
$.each(data,function(){if(this.checked&&this.header&&this.name===layer){var dt=selected.selected_text;if(dt){if($.isArray(dt)&&dt.length!==0)
dt=dt[0];set_header_timestep(com.track,this.header,dt,grid_datum.text);}
else{var space=dt.indexOf(' ');var tim=dt.substring(0,space);var d=$.datepicker.parseDate('d-M-yy',tim);d=$.datepicker.formatDate("dd-M-yy",d);header=this.header.format(' above '+grid_datum.text)+', {0} {1}';$header_layer.html(header.format(d,dt.substring(space))).show();}}});timestep_deferred.resolve();});});}});$('.animation button:not([name="'+cfg.anilayer+'"])').attr('enabled_title','Click here to start the animation.').button({icons:{primary:'ui-icon-play'},disabled:false}).click(function(){on_click_animate(map,this.name,this.name);});$('.animation button[name="'+cfg.anilayer+'"]').attr('enabled_title','Click here to stop the animation.').button({icons:{primary:'ui-icon-stop'},label:'Stop Animation',disabled:false}).click(function(){on_click_animate(map,this.name,'');});$("#timesteps_"+cfg.anilayer).hide();$("#sliders_"+cfg.anilayer).show();$("#slider_"+cfg.anilayer).progressbar();$('.legend_sprite').css('background-image','url('+cfg.basepath+'/_images/legend_sprite.png)');$.each(data,function(){if(this.checked){if(this.header&&(!wms_spec_data["timestep"]||wms_spec_data["timestep"].indexOf('p')===0)){set_header(this.header,grid_datum.text);}
var pos=this.name.indexOf('_auto');if(pos!==-1){$('input:radio[name="'+this.id+'"][value='+this.name.substr(0,pos)+']').prop('checked',true);$('input:checkbox[name="'+this.name+'"]').prop('checked',true);}
else{$('input:radio[name='+this.id+'][value="'+this.name+'"]').prop('checked',true);}
$('input:checkbox[name="'+this.id+'"]').prop('checked',true);$(".ui-accordion-header:not(.ui-state-active) > a[href$=#"+(this.theme||this.name)+"]").click();}});var wms_spec=$.param(wms_spec_data);init_station_panels(map,cfg,wms_spec,layer_data,data);handle_station_panels_spinner(map,cfg,wms_spec,layer_data,data);if(cfg.panel_scrollpos.length!==0&&cfg.panel_scrollpos!==0){setTimeout(function(){$('#legend').animate({scrollTop:cfg.panel_scrollpos});},300);}
$header_layer.show();$('input:radio[name=maptype][value="'+cfg.maptype.toLowerCase()+'"]').prop('checked',true);$('input:checkbox[name=layer1]').change(function(){cfg.check.trackline=$(this).prop('checked');set_checked(data,'trackline',cfg.check.trackline);clearTrackOverlays(map);if(cfg.check.trackline){create_cone(map,cfg,wms_spec,map.getZoom());if(needs_timestep_markers(data)){create_track_timesteps_points(map,cfg,wms_spec,data,map.getZoom());}
create_track_line(map,cfg,wms_spec);create_track_labels(map,cfg,wms_spec,map.getZoom(),false,data,layer_data);if(has_main_track)
create_maintrack(map,cfg,wms_spec);}});var planning_layers={'layer10':'watint','layer15':'water','layer16':'transport','layer17':'health','layer18':'energy','layer19':'emergency','layer20':'telecom'};$.each(planning_layers,function(key,value){$('input:checkbox[name='+key+']').change(function(evt){cfg.check[value]=$(this).prop('checked');set_checked(data,value,cfg.check[value]);clear_planning_overlays(map,value);if(cfg.check[value])
create_planning_points(map,cfg,wms_spec,map.getZoom(),value);evt.preventDefault();});});$('input:checkbox[name=layer11]').change(function(){cfg.check.invest_or_subtrack=$(this).prop('checked');set_checked(data,'invest_or_subtrack',cfg.check.invest_or_subtrack);clearTrackOrInvestOverlays(map);if(cfg.check.invest_or_subtrack){if(json.layers.track_invest){create_track_invest(map,cfg,wms_spec,map.getZoom(),layer_data);}
if(json.subtracks&&json.subtracks.data&&json.subtracks.data.length>0){create_subtrack_line(map,cfg,wms_spec);create_subtrack_points(map,cfg,wms_spec,map.getZoom(),data,layer_data,json.subtracks);}}});if(cfg.selectmodel==='cpra'){init_stations_list_url(cfg,wms_spec_data,storm_info_data,function(resp){$('#station_list').attr('href',resp);});}
legend_deferred.resolve();});return[legend_deferred.promise(),timestep_deferred.promise()];}
var enable_date=function(date){return[true,''];};function select_default_layer(data,json)
{var found=false;$.each(data,function(){if(this.checked&&this.isdefault&&json.layers[this.name]){found=true;return false;}});if(!found){$.each(data,function(){if(!this.checked&&(this.isfallback||(this.isdefault&&json.layers[this.name]))){this.checked=true;return false;}});}}
function unselect_non_existing_layers(data,json)
{var was_reset=false;$.each(data,function(){if(this.checked&&!json.layers[this.name]&&this.id==='layer0'){this.checked=false;was_reset=true;}});return was_reset;}
function has_checked(data)
{var has_checked=false;$.each(data,function(){if(this.checked&&this.isdefault){has_checked=true;return false;}});return has_checked;}
function is_checked(data,name)
{var is_checked=false;$.each(data,function(){if(this.name===name&&this.checked){is_checked=true;return false;}});return is_checked;}
function is_checked_theme(data,theme)
{var is_checked=false;$.each(data,function(){if(this.theme&&this.theme==theme&&this.checked){is_checked=true;return false;}});return is_checked;}
function get_checked(data)
{var d=null;$.each(data,function(){if(this.checked){d=this;return false;}});return d;}
function set_checked_timestep(data,layer,timestep)
{$.each(data,function(){if(this.name==layer){this.timestep=timestep;return false;}});}
function set_checked(data,name,flag)
{$.each(data,function(){if(this.name==name){this.checked=flag?true:false;return false;}});}
function get_layerdata(data,name){var d=null;$.each(data,function(){if(this.name==name){d=this;return false;}});return d;}
function fill_combobox(name,data,reset_list,title,title_one,inputname)
{var to_reset=reset_list||[];var $menutext=$('#'+name+'menu .menutext');var input=inputname?inputname:name;var $input=$('input[name='+input+']');var $menu=$('#'+name+'menu');var retval;var maxlen=0;$.each(data,function(i){if(this.selected){$menutext.text(this.text);$input.val(this.value);retval=this;}
if(this.text.length>maxlen)
maxlen=this.text.length;});if(data.length===0){return{value:0};}
else if(retval&&data.length===1){$('#triangle',$menu).hide();$menu.html(data[0].text).addClass('menu_single_entry');if(title_one!==null)
$menu.attr('title',title_one);return retval;}
var width=80;if(width<maxlen*7.5)
width=maxlen*7.5;if(input==='com'&&maxlen*8.5+6>width)
width=maxlen*8.5+6;$.template('menulist','<li><a href="#" value="{{=value}}">{{=text}}</a></li>');var embed='<ul>'+$.render(data,'menulist')+'</ul>';$menu.fgmenu({content:embed,width:width,flyOut:true,positionOpts:{posX:'left',posY:'auto',offsetX:0,offsetY:0,directionH:'right',directionV:'down',detectH:true,detectV:false,linkToFront:false},callback:function(){var newvalue=$(this).attr('value');if(newvalue!==$input.val()){$input.val(newvalue);$.each(to_reset,function(){var c=$('[name='+this+']');c.val(null);if(c.get(0))
c.get(0).selectedIndex=-1;});if(update_url(map)){fix_autolayer_current();$('form[name=mapform]').submit();}}}});if(title!==null)
$menu.attr('title',title);return retval;}
function fill_combined_combobox(name1,name2,data,reset_list,title,title_one,title_if_has_selected)
{var to_reset=reset_list||[];var $menutext=$('#'+name1+'menu .menutext');var $menu=$('#'+name1+'menu');var $outer=$('input[name='+name1+']');var $inner=$('input[name='+name2+']');var maxlen=94;var outer_ret,inner_ret;$.each(data,function(){if(this.text.length*7.5+24>maxlen)
maxlen=this.text.length*7.5+24;if(this.selected){var outer_text=this.text;$outer.val(this.value);$.each(this.data,function(){if(this.selected){if(this.text&&this.text.length!=0){$menutext.text(outer_text+' - '+this.text);}
else{$menutext.text(outer_text);}
$inner.val(this.value);inner_ret=this;}});outer_ret=this;}
$.each(this.data,function(){if(this.text.length*7.5>maxlen)
maxlen=this.text.length*7.5;});});if(data.length===0){return{outer:{value:0},inner:{value:0}};}
else if(outer_ret&&inner_ret&&data.length===1&&outer_ret.data.length===1){$('#triangle',$menu).hide();$menu.html($menutext.html()+'&nbsp;&nbsp;').addClass('menu_single_entry');if(title_one!==null)
$menu.attr('title',title_one);else if(title_if_has_selected!==null)
$menu.attr('title',title_if_has_selected);return{outer:outer_ret,inner:inner_ret};}
var width=80;if(width<maxlen)
width=maxlen;$.template('combined_menulist','<li><a href="#" value="{{=value}}">{{=text}}</a><ul>{{#each data}}<li><a href="#" value="{{=$view.parent.parent.data.value}}_{{=value}}">{{=text}}</a></li>{{/each}}</ul></li>');var menulist=$.render(data,'combined_menulist');$menu.fgmenu({content:'<ul>'+$.render(data,'combined_menulist')+'</ul>',width:width,flyOut:true,positionOpts:{posX:'left',posY:'auto',offsetX:0,offsetY:0,directionH:'right',directionV:'down',detectH:true,detectV:false,linkToFront:false},callback:function(){var values=$(this).attr('value').split('_');if(values.length>=2){if(values[0]!==$outer.val()||values[1]!==$inner.val()){$outer.val(values[0]);if(values.length===3)
$inner.val(values[1]+'_'+values[2]);else
$inner.val(values[1]);$.each(to_reset,function(){var c=$('[name='+this+']');c.val(null);if(c.get(0))
c.get(0).selectedIndex=-1;});if(update_url(map)){fix_autolayer_current();$('form[name=mapform]').submit();}}}
else if(values.length===1){$outer.val(values[0]);$inner.val('');$.each(to_reset,function(){var c=$('[name='+this+']');c.val(null);if(c.get(0))
c.get(0).selectedIndex=-1;});if(update_url(map)){fix_autolayer_current();$('form[name=mapform]').submit();}}}});if(title!==null)
$menu.attr('title',title);else if(outer_ret&&inner_ret&&title_if_has_selected!==null)
$menu.attr('title',title_if_has_selected);return{outer:outer_ret,inner:inner_ret};}
function alternative_layer(layers,name)
{var idx=name.lastIndexOf("shp");if(idx===name.length-3){var alt_layer_name=name.substr(0,idx);if(layers[alt_layer_name])
return alt_layer_name;}
if(layers[name+"shp"])
return name+"shp";return null;}
function get_checked_layer0(data)
{var checked_layer=null;$.each(data,function(){if(this.checked&&this.id==='layer0'){checked_layer=this.name;return false;}});return checked_layer;}
function get_checked_layer0_data(data)
{var d=null;$.each(data,function(){if(this.checked&&this.id==='layer0'){d=this;return false;}});return d;}
function load_buttons(button_data,cfg)
{var $info1=$('.topnav li.infobutton a');$info1.css('background-image','url('+cfg.basepath+'/_images/info1.png)');$info1.hover(function(){$(this).css('background-image','url('+cfg.basepath+'/_images/info2.png)');},function(){$(this).css('background-image','url('+cfg.basepath+'/_images/info1.png)');});var $info2=$(button_data.cls);$info2.css('background-image',button_data.image.format(1));$info2.hover(function(){$(this).css('background-image',button_data.image.format(2));},function(){$(this).css('background-image',button_data.image.format(1));});}
function init_legend(cfg)
{var $header=$('.header');$header.show();if(cfg.panel==="1"){$("#legend").show();$header.css({paddingLeft:'0px'});}}
function show_track(data,cfg,com_has_adv,track_global,wms_spec_data)
{var $is_storm=$("input[name=is_storm]");var has_adv=cfg.check.trackline;if(com_has_adv||track_global){has_adv=true;$.each(data,function(){if(this.theme&&this.theme==="trackline"){this.checked=true;return false;}});$is_storm.val('1');}
else{set_checked(data,"trackline",false);$is_storm.val('0');}
if(com_has_adv&&+cfg.isdefault){var $tabcontent=$(".TabContent");if($tabcontent.length)
$tabcontent.tabSwitch('moveTo',{easeType:'snap',index:1});var $selectmenu=$('input:radio[name=selectmenu][value="1"]');$selectmenu.click();$("#TabMenu").on("buttoncreate",function(event,ui){ui.buttonset().button('refresh');});}
return has_adv;}
function show_invest_or_subtrack(data,cfg,json)
{var $has_invest_or_subtrack=$("input[name=has_invest_or_subtrack]");var has_invest_or_subtrack=cfg.check.invest_or_subtrack;if(json.layers.track_invest||json.layers.track_sub){has_invest_or_subtrack=true;set_checked(data,"invest_or_subtrack",true);$has_invest_or_subtrack.val('1');}
else{set_checked(data,"invest_or_subtrack",false);$has_invest_or_subtrack.val('0');}
return has_invest_or_subtrack;}
function cookies_enabled()
{var cookieEnabled=navigator.cookieEnabled?true:false;if(typeof navigator.cookieEnabled==="undefined"&&!cookieEnabled)
{document.cookie="testcookie";cookieEnabled=document.cookie.indexOf("testcookie")!==-1?true:false;}
return cookieEnabled;}
function handle_disclaimer(cfg)
{var url,cookie,dlgbuttons;if(cfg.selectmodel==='best'){if(cfg.best_accept==='1'){return;}
url='/_controls/best_disclaimer.html';cookie='cera-best-disclaimer';dlgbuttons=function($cookie){return[{text:"Got it",click:function(){if($cookie.prop('checked')){$.cookie(cookie,'1',{expires:30,path:'/'});}
else{$.removeCookie(cookie,{path:'/'});}
$(this).dialog("close");}}]};}
else{if(cfg.accept==='1'){return;}
url='/_controls/disclaimer.html';cookie='cera-disclaimer';dlgbuttons=function($cookie){return[{text:"Accept",click:function(){if($cookie.prop('checked')){$.cookie(cookie,'1',{expires:30,path:'/'});}
else{$.removeCookie(cookie,{path:'/'});}
$(this).dialog("close");}},{text:"Decline",click:function(){window.open("https://coastalrisk.live","_self");}}]};}
if($.cookie(cookie)!=='1'){$.get(cfg.basepath+url,function(response){var $disclaimer=$('.disclaimer');if(cookies_enabled()){$(response).find('#disclaimerContent').appendTo($disclaimer);var $cookie=$("[name='cookie']");$("#disclaimerContent").dialog({width:"500px",modal:true,closeOnEscape:false,create:function(event,ui){$cookie.prop('checked',cookies_enabled());$(".ui-dialog-titlebar-close",$(this).dialog("widget")).hide();},buttons:dlgbuttons($cookie),close:function(event,ui){$(this).dialog("destroy").remove();}});}
else{$(response).find('#disclaimerContentNoCookies').appendTo($disclaimer);$("#disclaimerContentNoCookies").dialog({width:"500px",modal:true,create:function(event,ui){$(".ui-dialog-titlebar-close",$(this).dialog("widget")).hide();},open:function(event,ui){$(".ui-button",$(this).dialog("widget")).blur();},buttons:{"Ok":function(){$(this).dialog("close");}},close:function(event,ui){$(this).dialog("destroy").remove();}});}});}}
function amend_wms_spec_data(cfg,data,json,wms_spec_data)
{$.each(data,function(){if(this.checked){if(this.timestep&&!(cfg.anilayer&&cfg.anilayer.length)){if(this.timestep.length&&this.timestep[0]!=='['){var tag="timestep";if(this.name==="precimg")
tag="timestep_precimg";wms_spec_data[tag]=this.timestep;}
else if(json.first_timestep){wms_spec_data["timestep"]=json.first_timestep;}}
if(this.query){wms_spec_data["query"]=this.query;}}});}
function load_map_extent(cfg,selectmodel,has_adv,com,griddomain)
{var promise=$.Deferred();var url='{0}/mapextent?cera={1}&selectmodel={2}&has_adv={3}&com={4}'.format(cfg.django_base,cfg.asgs,selectmodel,has_adv?1:0,com);$.getJSON(url,function(json){var minzoom=5;if(selectmodel==='est'||selectmodel==='estdev'){minzoom=2;}
else if((selectmodel==='schism'||selectmodel==='schismdev')&&griddomain==='SCHISMpac'){minzoom=3;}
promise.resolve({'result':'success','sw':json.sw,'ne':json.ne,'mapextent':json.mapextent,'mapextent_data':json.mapextent_data,'minzoom':minzoom,'maxzoom':selectmodel==='ras'?15:13,'zoom':json.zoom||null});}).fail(function(){promise.resolve({'result':'fail'});});return promise;}
function get_timestep_input(current_layer0)
{if(current_layer0&&current_layer0.indexOf('shp')!==-1){return['timestep_elevshp','timestep_wvelshp','timestep_hsignshp','timestep_tpsshp','timestep_inunshp','timestep_rasdepthdem'];}
return['timestep_elev','timestep_wvel','timestep_hsign','timestep_tps','timestep_inun','timestep_rasdepthdem'];}
function get_sublayers(){var sublayers=[];$.each(arguments,function(index,value){$.each($('[name^='+value+']'),function(index,value){sublayers.push($(value).attr('name'));});});return sublayers;}
function startup_cera(json_data_promise,svg_data_promise)
{var cfg=get_config_data();var data=get_data_array(cfg);handle_disclaimer(cfg);var $tabcontent=$(".TabContent");if($tabcontent.length){$tabcontent.tabSwitch('create',{width:$(".TabContent:first").width(),height:$(".TabContent:first").height(),easeType:"swing",index:cfg.selectmenu});}
var $selectmenu=$('input:radio[name=selectmenu]');$selectmenu.click(function(){$tabcontent.tabSwitch('moveTo',{index:$(this).val()});});$($selectmenu[cfg.selectmenu]).prop('checked',true);var $tabmodels=$("#TabModels");enable_tooltips($("#TabModelsTitle",$tabmodels));var $modelmenu=$("#modelmenu");$modelmenu.selectmenu({change:function(event,data){var value=data.item.value;var form=document.forms['mapform'];if(value==='asgs'){form.cera.value='nc_ng';}
else{form.cera.value=value;}
form.isdefault.value='2';var current_layer0=get_checked_layer0(data);var timstep_inputs=get_timestep_input(current_layer0);var sublayers=get_sublayers('layer5','layer7','layer8');selectRun(value,map,['day','time','com','year','storm','advisory','track','ne','sw','zoom','mapextent','tz'].concat(timstep_inputs,sublayers));}});$modelmenu.val(cfg.selectmodel);$modelmenu.selectmenu("refresh");$tabmodels.show();var $daymenu=$("#daymenu");$daymenu.datepicker({dateFormat:'dd-M-yy',minDate:'01-Jan-1954',maxDate:'+1',altField:'#day',altFormat:'yymmdd',changeMonth:true,changeYear:true,constrainInput:true,beforeShowDay:function(date){return enable_date?enable_date(date):[true,''];},onSelect:function(value){var current_layer0=get_checked_layer0(data);var timstep_inputs=get_timestep_input(current_layer0);selectRun(value,map,['time','com','year','storm','advisory','track'].concat(timstep_inputs));}});$(".ui-datepicker-trigger").addClass('tooltip');$("#daymenubutton").click(function(){$daymenu.datepicker("show");});init_legend(cfg);var map_promise=initialize_plain_map(cfg,data);$.when(json_data_promise,map_promise,svg_data_promise).then(function(json,_,svg_data){enable_date=function(date){var enable=false;var style='';$.each(json.dates,function(){var d=$.datepicker.parseDate('yymmdd',this.value);if(+date===+d){enable=true;style=this.has_adv?'date-picker-has-storm':'';return false;}});return[enable,style];};svg_paths=create_svgpaths(svg_data);var index=0;if(json.dates){$.each(json.dates,function(i){if(this.selected){index=i;return false;}});$("#daymenu").val(json.dates[index].text);$("#day").val(json.dates[index].value);}
enable_tooltips($(".tooltip[title]"));if(json.data_host){cfg.data_host=json.data_host;cfg.data_host_cache=json.data_host_cache;if(json.nr_cache_hosts){json.nr_cache_hosts=parseInt(json.nr_cache_hosts,10);}
if(json.nr_cache_hosts!==0){cfg.nr_cache_hosts=json.nr_cache_hosts;cfg.wms_source=window.location.protocol+"//tc{0}."+json.data_host+cfg.django_ceracgi+cfg.ceracgi_wms_base_path;cfg.wms_source_alt=window.location.protocol+"//tc{0}."+json.data_host_cache+cfg.django_ceracgi+cfg.ceracgi_wms_base_path;cfg.ani_source=window.location.protocol+"//tc{0}."+json.data_host+cfg.django_ceracgi+cfg.ceracgi_ani_base_path;}
else{cfg.nr_cache_hosts=4;cfg.wms_source_alt=window.location.protocol+"//tc{0}."+json.data_host_cache+cfg.django_ceracgi+cfg.ceracgi_wms_base_path;cfg.wms_source=window.location.protocol+"//"+json.data_host+cfg.django_ceracgi+cfg.ceracgi_wms_base_path;cfg.ani_source=window.location.protocol+"//"+json.data_host+cfg.django_ceracgi+cfg.ceracgi_ani_base_path;}
cfg.shp_source=cfg.django_base+"/ceracgi/cera_download_shp_forward?";cfg.shppoints_source=cfg.django_base+"/ceracgi/cera_download_shppoints_forward?";cfg.tif_source=cfg.django_base+"/ceracgi/cera_download_tif_forward?";cfg.csv_source=cfg.django_base+"/ceracgi/cera_download_csv_forward?";cfg.netcdf_source=cfg.django_base+"/ceracgi/cera_download_netcdf_forward?";cfg.hydro_source=cfg.django_base+"/ceracgi/cera_download_hydro_forward?";cfg.hdf5_source=cfg.django_base+"/ceracgi/cera_download_hdf5_forward?";cfg.dat_source=cfg.django_base+"/ceracgi/cera_download_dat_forward?";cfg.netcdf_format_source=cfg.django_base+"/ceracgi/cera_download_opendap_fileformat_forward?";cfg.query_source="http://"+json.data_host+cfg.cgi_base+"/cera_wms.cgi?";}
if(unselect_non_existing_layers(data,json)){select_default_layer(data,json);}
else if(cfg.isdefault==="1"){select_default_layer(data,json);}
else{$.each(data,function(){if(this.checked&&this.isdefault&&!json.layers[this.name]){var alt_layer_name=alternative_layer(json.layers,this.name);if(!json.layers[alt_layer_name]){select_default_layer(data,json);}
else{set_checked(data,alt_layer_name,true);}
this.checked=false;return false;}});}
var current_layer0=get_checked_layer0(data);if(!current_layer0){select_default_layer(data,json);}
current_layer0=get_checked_layer0(data);ga('set','page','/'+(current_layer0||''));ga('send','pageview');var wms_spec_data={};var layer_data={};var storm_info_data=null;var is_hindcast=false;var timstep_inputs=get_timestep_input(current_layer0);var time=fill_combobox('time',json.times,['com','year','storm','advisory','track'].concat(timstep_inputs),null,'Start time of the selected model run');var infotext;if(cfg.dev_site&&cfg.dev_site==='1'||cfg.perm==='pro'){infotext='Wind model and model mesh';}
else{infotext='Geographic area with the highest model resolution';}
var com=fill_combobox('com',json.comments_day,['year','storm','advisory','track'].concat(timstep_inputs),null,infotext);var storm_year=fill_combined_combobox('year','storm',json.years,['advisory','track','day','daymenu','time','com'].concat(timstep_inputs),null,'Year and storm','Click here to select another year and storm');var advisory_track,grid;if(storm_year.inner&&storm_year.outer){advisory_track=fill_combined_combobox('advisory','track',json.advisories,['day','daymenu','time','com'].concat(timstep_inputs),'Click here to select another advisory and storm track','Advisory and storm track');var infotext1,infotext2;if(cfg.dev_site&&cfg.dev_site==='1'||cfg.perm==='pro'){infotext1='Click here to select another wind model and model mesh';infotext2='Wind model and model mesh';}
else{infotext1='Click here to select the geographic area with the highest model resolution';infotext2='Geographic area with the highest model resolution';}
if(advisory_track.outer){is_hindcast=com.has_adv&&advisory_track.outer.value+0>900?true:false;if(advisory_track.inner){grid=fill_combobox('grid',json.comments_storm,['year','storm','advisory','track'].concat(timstep_inputs),infotext1,infotext2,'com');}}}
else{$tabcontent.tabSwitch('moveTo',{easeType:'snap',index:0});$('input:radio[name=selectmenu]').filter('[value=0]').click();}
if(!cfg.selectmodel||(cfg.selectmodel!=='est'&&cfg.selectmodel!=='estdev'&&cfg.selectmodel!=='fema'&&cfg.selectmodel!=='schism'&&cfg.selectmodel!=='schismdev')){$("#TabMenu").buttonset().show();}
else if(cfg.selectmodel==='est'||cfg.selectmodel==='estdev'||cfg.selectmodel==='schism'||cfg.selectmodel==='schismdev'){$tabcontent.tabSwitch('moveTo',{easeType:'snap',index:0});$('input:radio[name=selectmenu]').filter('[value=0]').click();}
$tabcontent.show();var day=json.dates[index];wms_spec_data={"day":day.value,"time":time.value,"com":com.value,"griddomain":json.grid.name,"model":cfg.selectmodel,"tz":cfg.timezone,"unit":cfg.unit,"legend":(com.has_adv&&!com.adv_is_subtrack)?json.legend:"nostorm","ceraversion":json.version?json.version:"1"};layer_data={"day":day.value,"time":time.value,"track":advisory_track&&advisory_track.inner&&advisory_track.inner.trackid?advisory_track.inner.trackid:'',"com":com.value,"layer":"","tz":cfg.timezone,"unit":cfg.unit,"data_host":cfg.data_host,"dev":cfg.dev_site?cfg.dev_site:"0"};if(com.has_adv){storm_info_data={"com":com,"year":storm_year?storm_year.outer:null,"storm":storm_year?storm_year.inner:null,"advisory":advisory_track?advisory_track.outer:null,"track":advisory_track?advisory_track.inner:null};}
var map_extent_promise;if(+cfg.isdefault||(cfg.selectmodel==='schismdev'&&cfg.griddomain!=json.grid.name)){map_extent_promise=load_map_extent(cfg,cfg.selectmodel,com.has_adv,com.value,json.grid.name);}
else if(cfg.asgs==='pub'){if(cfg.selectmodel==='est'&&com.has_adv){map_extent_promise=load_map_extent(cfg,'asgs',true,com.value,json.grid.name);}
else if(cfg.selectmodel==='asgs'&&!com.has_adv){map_extent_promise=load_map_extent(cfg,'est',false,com.value,json.grid.name);}}
cfg.griddomain=json.grid.name;amend_wms_spec_data(cfg,data,json,wms_spec_data);$('.fg-menu li a span').click(function(){$(this).parent().addClass('ui-state-focus');});var has_main_track=advisory_track&&advisory_track.inner&&advisory_track.inner.value&&advisory_track.inner.value.indexOf('t01_')!==0;var promises=load_legend(data,cfg,wms_spec_data,layer_data,storm_info_data,json,current_layer0,com,is_hindcast,has_main_track);cfg.is_main_track=advisory_track&&advisory_track.inner&&advisory_track.inner.value&&advisory_track.inner.value.indexOf('t01_')===0;if(is_checked(data,'wvel')&&$("input[name=has_wvelf]").val()!=='0'){set_checked(data,'wvelf',true);cfg.check.wvelf=true;}
else{set_checked(data,'wvelf',false);cfg.check.wvelf=false;}
var defer_loading_wms=false;var selected_data=get_checked(data);if(selected_data&&selected_data.timestep&&(selected_data.timestep.length===0||selected_data.timestep[0]==='['))
defer_loading_wms=true;var wms_spec=$.param(wms_spec_data);if(!defer_loading_wms){if(map_extent_promise){$.when(map_extent_promise).then(function(resp){if(resp.result==='success'){cfg.sw=resp.sw;cfg.ne=resp.ne;cfg.mapextent=resp.mapextent;cfg.mapextent_data=resp.mapextent_data;cfg.zoom=resp.zoom||resp.minzoom;cfg.minzoom=resp.minzoom;cfg.maxzoom=resp.maxzoom;}
initialize_map(data,cfg,json,wms_spec_data,layer_data,com);});}
else{initialize_map(data,cfg,json,wms_spec_data,layer_data,com);}}
cfg.check.trackline=show_track(data,cfg,com.has_adv,json.layers.track_global,wms_spec_data);cfg.check.invest_or_subtrack=show_invest_or_subtrack(data,cfg,json);var data_url=cfg.django_base+'/adcircrun/id='+wms_spec_data.com+'/tz='+wms_spec_data.tz+'/asgs='+cfg.asgs+'.hd';$.get(data_url,function(response){$("#header_time").html(response);});load_arrow_images(cfg);$.when(promises[0]).then(function(){initialize_dynamic_data(data,cfg,wms_spec,layer_data,com.has_adv,is_hindcast,json,has_main_track);enable_controls(map);enable_tooltips($(".tooltip[title]"));load_arrow_images(cfg);if(!is_checked(data,'wvel')){var wvelf=$('#wvelf');$(':checkbox',wvelf).prop("checked",false);wvelf.children().attr('disabled','disabled').addClass('form_grey');}
reopenInfoWindow(cfg,wms_spec_data);});$.when(promises[1]).then(function(){if(defer_loading_wms)
{wms_spec_data["timestep"]=selected_data.timestep;if(map_extent_promise){$.when(map_extent_promise).then(function(resp){if(resp.result==='success'){cfg.sw=resp.sw;cfg.ne=resp.ne;cfg.mapextent=resp.mapextent;cfg.mapextent_data=resp.mapextent_data;cfg.zoom=cfg.minzoom=resp.minzoom;cfg.maxzoom=resp.maxzoom;}
initialize_map(data,cfg,json,wms_spec_data,layer_data,com);});}
else{initialize_map(data,cfg,json,wms_spec_data,layer_data,com);}}});besttrack_info_links(cfg,storm_info_data);btnDwnl_form(data,cfg,wms_spec_data);btnLink_form(map,data,cfg);btnSettings_form(cfg);btnHelp_form(cfg);btnInfo_form(cfg,wms_spec_data);btnTabInfo_form(cfg);footerdisclaimer_form(cfg,wms_spec_data);footer_data_form(cfg,wms_spec_data);footer_credits_form(cfg);});}// Copyright (c) 2009 Hieu Pham

(function($){$.fn.tabSwitch=function(command,Arguments,EndFunction){var defaults={type:"slide",cols:2,toggle:"fade",ease:40,easeType:"linear",loopback:1,width:400,height:0,index:0,speed:500,interval:5000,step:1,wrapperClass:"",viewportClass:""};var Args=$.extend(defaults,Arguments);var Obj=this;var jFirstObj=Obj.eq(1);var DOMFirstObj=Obj.eq(1).get(0);if(!$.isFunction(EndFunction)){var Callback=function(){$.data(DOMFirstObj,"index",Args.index);};}
else{var Callback=function(){$.data(DOMFirstObj,"index",Args.index);EndFunction();};}
StoreToCache=function(){$.data(DOMFirstObj,"type",Args.type);$.data(DOMFirstObj,"toggle",Args.toggle);$.data(DOMFirstObj,"cols",Args.cols);$.data(DOMFirstObj,"ease",Args.ease);$.data(DOMFirstObj,"easeType",Args.easeType);$.data(DOMFirstObj,"index",Args.index);$.data(DOMFirstObj,"loopback",Args.loopback);if(jFirstObj.attr('style')){$.data(DOMFirstObj,"orgAttr",jFirstObj.attr('style'));}else{$.data(DOMFirstObj,"orgAttr","");}}
backFromCache=function(){Obj.attr('style',$.data(DOMFirstObj,"orgAttr"));var ViewPortObj=$("#ViewPort"+$.data(DOMFirstObj));ViewPortObj.replaceWith(Obj);stopAuto();$.removeData(DOMFirstObj);}
var createTab=function(){StoreToCache();if(Args.width)Obj.width(Args.width);if(Args.height)Obj.height(Args.height);var WraperSelector="WideDiv";Obj.wrapAll("<div id='"+WraperSelector+"'></div>");var WraperObj=$("#"+WraperSelector);WraperObj.addClass(Args.wraperClass);WraperObj.css({"position":"relative"});WraperObj.wrap("<div id='"+WraperSelector.replace("WideDiv","ViewPort")+"'></div>")
var ViewPortObj=$("#"+WraperSelector.replace("WideDiv","ViewPort"));ViewPortObj.width(Args.width);ViewPortObj.height(Args.height);ViewPortObj.css({"display":"block","overflow":"hidden","position":"relative"});ViewPortObj.addClass(Args.viewportClass);switch(Args.type)
{case"slide":Obj.css({"float":"left"});WraperObj.width((Args.width+2)*Obj.length*1.1);break;case"scroll":WraperObj.width(Args.width);WraperObj.height((Args.height+2)*Obj.length);break;case"toggle":WraperObj.width(Args.width);WraperObj.height(Args.height);Obj.css({"position":"absolute","left":"-999px"});Obj.eq(Args.index).css({"left":"0px","top":"0px"});Obj.eq(Args.index).css("opacity",1);break;case"table":WraperObj.width(Args.width*Args.cols);Obj.css("float","left");}
Args.easeType='snap';moveTo();}
var moveTo=function(){var ease=0;if(!Args.easeType){Args.easeType=(DOMFirstObj,"easeType");}
if(Args.index>Obj.length-1){if($.data(DOMFirstObj,"loopback")!=0){Args.index=0;ease=-$.data(DOMFirstObj,"ease");}
else return;}
if(Args.index<0){if($.data(DOMFirstObj,"loopback")!=0){Args.index=Obj.length-1;ease=$.data(DOMFirstObj,"ease");}else return;}
var WraperSelector="WideDiv";var WraperObj=$("#"+WraperSelector);switch($.data(DOMFirstObj,"type")){case'slide':if(ease!=0){var easeLevel=(parseInt(WraperObj.css("left").replace("px",""))+ease);WraperObj.animate({left:easeLevel+"px"},Args.speed,function(){WraperObj.animate({left:-(Obj.outerWidth(true)*Args.index)+"px"},Args.speed,Args.easeType,Callback());});}else{if(Args.easeType=='snap')
WraperObj.css('left',-(Obj.outerWidth(true)*Args.index)+"px");else
WraperObj.animate({left:-(Obj.outerWidth(true)*Args.index)+"px"},Args.speed,Args.easeType,Callback());}
break;case'scroll':if(ease!=0){var easeLevel=(parseInt(WraperObj.css("top").replace("px",""))+ease);WraperObj.animate({top:easeLevel+"px"},Args.speed,function(){WraperObj.animate({top:-(Obj.outerHeight(true)*Args.index)+"px"},Args.speed,Args.easeType,Callback());});}else{WraperObj.animate({top:-(Obj.outerHeight(true)*Args.index)+"px"},Args.speed,Args.easeType,Callback());}
break;case'toggle':Obj.eq(Args.index).css({"left":"0px","top":"0px"});switch($.data(DOMFirstObj,"toggle"))
{case"fade":Obj.eq(Args.index).css({"opacity":0});Obj.eq(Args.index).animate({"opacity":1},Args.speed);if($.data(DOMFirstObj,"index")!=Args.index){Obj.eq($.data(DOMFirstObj,"index")).animate({"opacity":0},Args.speed,function(){$(this).css("left",-999);Callback();});}
break;case"toggle":if($.data(DOMFirstObj,"index")!=Args.index){Obj.eq(Args.index).css({"display":"none"});Obj.eq($.data(DOMFirstObj,"index")).slideUp(Args.speed,function(){Obj.eq(Args.index).slideDown(Args.speed,function(){Callback();});$(this).css("left",-999);});}
break;case"show":if($.data(DOMFirstObj,"index")!=Args.index){Obj.eq(Args.index).css({"display":"none"});Obj.eq($.data(DOMFirstObj,"index")).hide(Args.speed,function(){Obj.eq(Args.index).show(Args.speed,function(){Callback();});$(this).css("left",-999);});}
break;case"noeffect":if($.data(DOMFirstObj,"index")!=Args.index){Obj.eq($.data(DOMFirstObj,"index")).css("left",-999);Callback();}
break;}
break;case"table":var cols=$.data(DOMFirstObj,"cols");var nextX=-(Args.index%cols)*Obj.width();var nextY=-Math.floor(Args.index/cols)*Obj.height();WraperObj.animate({"left":nextX},Args.speed,Args.easeType,function(){WraperObj.animate({"top":nextY},Args.speed,Args.easeType,Callback());});break;default:$('html,body').animate({"scrollTop":Obj.eq(Args.index).offset().top},Args.speed);break;}};moveStep=function(){var currentIdx=$.data(DOMFirstObj,"index");Args.index=parseInt(currentIdx)+parseInt(Args.step);moveTo();}
startAuto=function(){$.data(DOMFirstObj,"AutoSwitch",setInterval(moveStep,Args.interval));}
stopAuto=function(){clearInterval($.data(DOMFirstObj,"AutoSwitch"));$.removeData(DOMFirstObj,"AutoSwitch");}
toggleAuto=function(){if(isAuto()){stopAuto();}else{startAuto();}}
isAuto=function(){if($.data(DOMFirstObj,"AutoSwitch")){return true;}else{return false;}}
if(!command)command="";switch(command.toLowerCase()){case"index":if($.data(DOMFirstObj,"index")){return $.data(DOMFirstObj,"index");}else{return 0;}
break;case"moveto":moveTo();break;case"movestep":moveStep();break;case"destroy":backFromCache();break;case"create":createTab();break;case"isauto":return isAuto();break;case"toggleauto":toggleAuto();break;case"startauto":startAuto();break;case"stopauto":stopAuto();break;}};})(jQuery);// Copyright (c) 2013 - John Culviner

(function($,window){var htmlSpecialCharsRegEx=/[<>&\r\n"']/gm;var htmlSpecialCharsPlaceHolders={'<':'lt;','>':'gt;','&':'amp;','\r':"#13;",'\n':"#10;",'"':'quot;',"'":'#39;'};$.extend({fileDownload:function(fileUrl,options){var settings=$.extend({preparingMessageHtml:null,failMessageHtml:null,androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",dialogOptions:{modal:true},prepareCallback:function(url){},successCallback:function(url){},abortCallback:function(url){},failCallback:function(responseHtml,url,error){},httpMethod:"GET",data:null,checkInterval:100,cookieName:"fileDownload",cookieValue:"true",cookiePath:"/",cookieDomain:null,popupWindowTitle:"Initiating file download...",encodeHTMLEntities:true},options);var deferred=new $.Deferred();var userAgent=(navigator.userAgent||navigator.vendor||window.opera).toLowerCase();var isIos;var isAndroid;var isOtherMobileBrowser;if(/ip(ad|hone|od)/.test(userAgent)){isIos=true;}else if(userAgent.indexOf('android')!==-1){isAndroid=true;}else{isOtherMobileBrowser=/avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4));}
var httpMethodUpper=settings.httpMethod.toUpperCase();if(isAndroid&&httpMethodUpper!=="GET"&&settings.androidPostUnsupportedMessageHtml){if($().dialog){$("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions);}else{alert(settings.androidPostUnsupportedMessageHtml);}
return deferred.reject();}
var $preparingDialog=null;var internalCallbacks={onPrepare:function(url){if(settings.preparingMessageHtml){$preparingDialog=$("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions);}else if(settings.prepareCallback){settings.prepareCallback(url);}},onSuccess:function(url){if($preparingDialog){$preparingDialog.dialog('close');}
settings.successCallback(url);deferred.resolve(url);},onAbort:function(url){if($preparingDialog){$preparingDialog.dialog('close');};settings.abortCallback(url);deferred.reject(url);},onFail:function(responseHtml,url,error){if($preparingDialog){$preparingDialog.dialog('close');}
if(settings.failMessageHtml){$("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions);}
settings.failCallback(responseHtml,url,error);deferred.reject(responseHtml,url);}};internalCallbacks.onPrepare(fileUrl);if(settings.data!==null&&typeof settings.data!=="string"){settings.data=$.param(settings.data);}
var $iframe,downloadWindow,formDoc,$form;if(httpMethodUpper==="GET"){if(settings.data!==null){var qsStart=fileUrl.indexOf('?');if(qsStart!==-1){if(fileUrl.substring(fileUrl.length-1)!=="&"){fileUrl=fileUrl+"&";}}else{fileUrl=fileUrl+"?";}
fileUrl=fileUrl+settings.data;}
if(isIos||isAndroid){downloadWindow=window.open(fileUrl);downloadWindow.document.title=settings.popupWindowTitle;window.focus();}else if(isOtherMobileBrowser){window.location(fileUrl);}else{$iframe=$("<iframe>").hide().prop("src",fileUrl).appendTo("body");}}else{var formInnerHtml="";if(settings.data!==null){$.each(settings.data.replace(/\+/g,' ').split("&"),function(){var kvp=this.split("=");var k=kvp[0];kvp.shift();var v=kvp.join("=");kvp=[k,v];var key=settings.encodeHTMLEntities?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])):decodeURIComponent(kvp[0]);if(key){var value=settings.encodeHTMLEntities?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])):decodeURIComponent(kvp[1]);formInnerHtml+='<input type="hidden" name="'+key+'" value="'+value+'" />';}});}
if(isOtherMobileBrowser){$form=$("<form>").appendTo("body");$form.hide().prop('method',settings.httpMethod).prop('action',fileUrl).html(formInnerHtml);}else{if(isIos){downloadWindow=window.open("about:blank");downloadWindow.document.title=settings.popupWindowTitle;formDoc=downloadWindow.document;window.focus();}else{$iframe=$("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body");formDoc=getiframeDocument($iframe);}
formDoc.write("<html><head></head><body><form method='"+settings.httpMethod+"' action='"+fileUrl+"'>"+formInnerHtml+"</form>"+settings.popupWindowTitle+"</body></html>");$form=$(formDoc).find('form');}
$form.submit();}
setTimeout(checkFileDownloadComplete,settings.checkInterval);function checkFileDownloadComplete(){var cookieValue=settings.cookieValue;if(typeof cookieValue=='string'){cookieValue=cookieValue.toLowerCase();}
var lowerCaseCookie=settings.cookieName.toLowerCase()+"="+cookieValue;if(document.cookie.toLowerCase().indexOf(lowerCaseCookie)>-1){internalCallbacks.onSuccess(fileUrl);var cookieData=settings.cookieName+"=; path="+settings.cookiePath+"; expires="+new Date(0).toUTCString()+";";if(settings.cookieDomain)cookieData+=" domain="+settings.cookieDomain+";";document.cookie=cookieData;cleanUp(false);return;}
if(downloadWindow||$iframe){try{var formDoc=downloadWindow?downloadWindow.document:getiframeDocument($iframe);if(formDoc&&formDoc.body!==null&&formDoc.body.innerHTML.length){var isFailure=true;if($form&&$form.length){var $contents=$(formDoc.body).contents().first();try{if($contents.length&&$contents[0]===$form[0]){isFailure=false;}}catch(e){if(e&&e.number==-2146828218){isFailure=true;}else{throw e;}}}
if(isFailure){setTimeout(function(){internalCallbacks.onFail(formDoc.body.innerHTML,fileUrl);cleanUp(true);},100);return;}}}
catch(err){internalCallbacks.onFail('',fileUrl,err);cleanUp(true);return;}}
setTimeout(checkFileDownloadComplete,settings.checkInterval);}
function getiframeDocument($iframe){var iframeDoc=$iframe[0].contentWindow||$iframe[0].contentDocument;if(iframeDoc.document){iframeDoc=iframeDoc.document;}
return iframeDoc;}
function cleanUp(isFailure){setTimeout(function(){if(downloadWindow){if(isAndroid){downloadWindow.close();}
if(isIos){if(downloadWindow.focus){downloadWindow.focus();if(isFailure){downloadWindow.close();}}}}},0);}
function htmlSpecialCharsEntityEncode(str){return str.replace(htmlSpecialCharsRegEx,function(match){return'&'+htmlSpecialCharsPlaceHolders[match];});}
var promise=deferred.promise();promise.abort=function(){cleanUp();$iframe.attr('src','').html('');internalCallbacks.onAbort(fileUrl);};return promise;}});})(jQuery,this||window);// Copyright (c) Luke Mahe https://github.com/googlemaps/js-info-bubble

function InfoBubble(opt_options){this.extend(InfoBubble,google.maps.OverlayView);this.tabs_=[];this.activeTab_=null;this.baseZIndex_=100;this.isOpen_=false;var options=opt_options||{};if(options['backgroundColor']==undefined){options['backgroundColor']=this.BACKGROUND_COLOR_;}
if(options['borderColor']==undefined){options['borderColor']=this.BORDER_COLOR_;}
if(options['borderRadius']==undefined){options['borderRadius']=this.BORDER_RADIUS_;}
if(options['borderWidth']==undefined){options['borderWidth']=this.BORDER_WIDTH_;}
if(options['padding']==undefined){options['padding']=this.PADDING_;}
if(options['arrowPosition']==undefined){options['arrowPosition']=this.ARROW_POSITION_;}
if(options['disableAutoPan']==undefined){options['disableAutoPan']=false;}
if(options['disableAnimation']==undefined){options['disableAnimation']=false;}
if(options['minWidth']==undefined){options['minWidth']=this.MIN_WIDTH_;}
if(options['shadowStyle']==undefined){options['shadowStyle']=this.SHADOW_STYLE_;}
if(options['arrowSize']==undefined){options['arrowSize']=this.ARROW_SIZE_;}
if(options['arrowStyle']==undefined){options['arrowStyle']=this.ARROW_STYLE_;}
if(options['closeSrc']==undefined){options['closeSrc']=this.CLOSE_SRC_;}
if(options['closeStyle']==undefined){options['closeStyle']=this.CLOSE_STYLE_;}
this.buildDom_();this.setValues(options);this.close_.className=this.get('closeStyle');}
window['InfoBubble']=InfoBubble;InfoBubble.prototype.ARROW_SIZE_=15;InfoBubble.prototype.ARROW_STYLE_=0;InfoBubble.prototype.SHADOW_STYLE_=1;InfoBubble.prototype.MIN_WIDTH_=50;InfoBubble.prototype.ARROW_POSITION_=50;InfoBubble.prototype.PADDING_=10;InfoBubble.prototype.BORDER_WIDTH_=1;InfoBubble.prototype.BORDER_COLOR_='#ccc';InfoBubble.prototype.BORDER_RADIUS_=10;InfoBubble.prototype.BACKGROUND_COLOR_='#fff';InfoBubble.prototype.CLOSE_STYLE_='js-info-bubble-close';InfoBubble.prototype.extend=function(obj1,obj2){return(function(object){for(var property in object.prototype){this.prototype[property]=object.prototype[property];}
return this;}).apply(obj1,[obj2]);};InfoBubble.prototype.buildDom_=function(){var bubble=this.bubble_=document.createElement('DIV');bubble.style['position']='absolute';bubble.style['zIndex']=this.baseZIndex_;var tabsContainer=this.tabsContainer_=document.createElement('DIV');tabsContainer.style['position']='relative';var close=this.close_=document.createElement('DIV');close.style['position']='absolute';close.style['border']=0;close.style['zIndex']=this.baseZIndex_+1;close.style['cursor']='pointer';close.className=this.CLOSE_STYLE_;var that=this;google.maps.event.addDomListener(close,'click',function(){that.close();google.maps.event.trigger(that,'closeclick');});var contentContainer=this.contentContainer_=document.createElement('DIV');contentContainer.style['overflowX']='auto';contentContainer.style['overflowY']='auto';contentContainer.style['cursor']='default';contentContainer.style['clear']='both';contentContainer.style['position']='relative';var content=this.content_=document.createElement('DIV');contentContainer.appendChild(content);var arrow=this.arrow_=document.createElement('DIV');arrow.style['position']='relative';var arrowOuter=this.arrowOuter_=document.createElement('DIV');var arrowInner=this.arrowInner_=document.createElement('DIV');arrowOuter.className+="arrowOuter";arrowInner.className+="arrowInner";var arrowSize=this.getArrowSize_();arrowOuter.style['position']=arrowInner.style['position']='absolute';arrowOuter.style['left']=arrowInner.style['left']='50%';arrowOuter.style['height']=arrowInner.style['height']='0';arrowOuter.style['width']=arrowInner.style['width']='0';arrowOuter.style['marginLeft']=this.px(-arrowSize);arrowOuter.style['borderWidth']=this.px(arrowSize);arrowOuter.style['borderBottomWidth']=0;var bubbleShadow=this.bubbleShadow_=document.createElement('DIV');bubbleShadow.style['position']='absolute';bubble.style['display']=bubbleShadow.style['display']='none';bubble.appendChild(this.tabsContainer_);bubble.appendChild(close);bubble.appendChild(contentContainer);arrow.appendChild(arrowOuter);arrow.appendChild(arrowInner);bubble.appendChild(arrow);var stylesheet=document.createElement('style');stylesheet.setAttribute('type','text/css');this.animationName_='_ibani_'+Math.round(Math.random()*10000);var css='.'+this.animationName_+'{-webkit-animation-name:'+
this.animationName_+';-webkit-animation-duration:0.5s;'+'-webkit-animation-iteration-count:1;}'+'@-webkit-keyframes '+this.animationName_+' {from {'+'-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% '+'{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}';stylesheet.textContent=css;document.getElementsByTagName('head')[0].appendChild(stylesheet);};InfoBubble.prototype.setBackgroundClassName=function(className){this.set('backgroundClassName',className);};InfoBubble.prototype['setBackgroundClassName']=InfoBubble.prototype.setBackgroundClassName;InfoBubble.prototype.backgroundClassName_changed=function(){this.content_.className=this.get('backgroundClassName');};InfoBubble.prototype['backgroundClassName_changed']=InfoBubble.prototype.backgroundClassName_changed;InfoBubble.prototype.setTabClassName=function(className){this.set('tabClassName',className);};InfoBubble.prototype['setTabClassName']=InfoBubble.prototype.setTabClassName;InfoBubble.prototype.tabClassName_changed=function(){this.updateTabStyles_();};InfoBubble.prototype['tabClassName_changed']=InfoBubble.prototype.tabClassName_changed;InfoBubble.prototype.getArrowStyle_=function(){return parseInt(this.get('arrowStyle'),10)||0;};InfoBubble.prototype.setArrowStyle=function(style){this.set('arrowStyle',style);};InfoBubble.prototype['setArrowStyle']=InfoBubble.prototype.setArrowStyle;InfoBubble.prototype.arrowStyle_changed=function(){this.arrowSize_changed();};InfoBubble.prototype['arrowStyle_changed']=InfoBubble.prototype.arrowStyle_changed;InfoBubble.prototype.getArrowSize_=function(){return parseInt(this.get('arrowSize'),10)||0;};InfoBubble.prototype.setArrowSize=function(size){this.set('arrowSize',size);};InfoBubble.prototype['setArrowSize']=InfoBubble.prototype.setArrowSize;InfoBubble.prototype.arrowSize_changed=function(){this.borderWidth_changed();};InfoBubble.prototype['arrowSize_changed']=InfoBubble.prototype.arrowSize_changed;InfoBubble.prototype.setArrowPosition=function(pos){this.set('arrowPosition',pos);};InfoBubble.prototype['setArrowPosition']=InfoBubble.prototype.setArrowPosition;InfoBubble.prototype.getArrowPosition_=function(){return parseInt(this.get('arrowPosition'),10)||0;};InfoBubble.prototype.arrowPosition_changed=function(){var pos=this.getArrowPosition_();this.arrowOuter_.style['left']=this.arrowInner_.style['left']=pos+'%';this.redraw_();};InfoBubble.prototype['arrowPosition_changed']=InfoBubble.prototype.arrowPosition_changed;InfoBubble.prototype.setZIndex=function(zIndex){this.set('zIndex',zIndex);};InfoBubble.prototype['setZIndex']=InfoBubble.prototype.setZIndex;InfoBubble.prototype.getZIndex=function(){return parseInt(this.get('zIndex'),10)||this.baseZIndex_;};InfoBubble.prototype.zIndex_changed=function(){var zIndex=this.getZIndex();this.bubble_.style['zIndex']=this.baseZIndex_=zIndex;this.close_.style['zIndex']=zIndex+1;};InfoBubble.prototype['zIndex_changed']=InfoBubble.prototype.zIndex_changed;InfoBubble.prototype.setShadowStyle=function(shadowStyle){this.set('shadowStyle',shadowStyle);};InfoBubble.prototype['setShadowStyle']=InfoBubble.prototype.setShadowStyle;InfoBubble.prototype.getShadowStyle_=function(){return parseInt(this.get('shadowStyle'),10)||0;};InfoBubble.prototype.shadowStyle_changed=function(){var shadowStyle=this.getShadowStyle_();var display='';var shadow='';var backgroundColor='';switch(shadowStyle){case 0:display='none';break;case 1:shadow='40px 15px 10px rgba(33,33,33,0.3)';backgroundColor='transparent';break;case 2:shadow='0 0 2px rgba(33,33,33,0.3)';backgroundColor='rgba(33,33,33,0.35)';break;}
this.bubbleShadow_.style['boxShadow']=this.bubbleShadow_.style['webkitBoxShadow']=this.bubbleShadow_.style['MozBoxShadow']=shadow;this.bubbleShadow_.style['backgroundColor']=backgroundColor;if(this.isOpen_){this.bubbleShadow_.style['display']=display;this.draw();}};InfoBubble.prototype['shadowStyle_changed']=InfoBubble.prototype.shadowStyle_changed;InfoBubble.prototype.showCloseButton=function(){this.set('hideCloseButton',false);};InfoBubble.prototype['showCloseButton']=InfoBubble.prototype.showCloseButton;InfoBubble.prototype.hideCloseButton=function(){this.set('hideCloseButton',true);};InfoBubble.prototype['hideCloseButton']=InfoBubble.prototype.hideCloseButton;InfoBubble.prototype.hideCloseButton_changed=function(){this.close_.style['display']=this.get('hideCloseButton')?'none':'';};InfoBubble.prototype['hideCloseButton_changed']=InfoBubble.prototype.hideCloseButton_changed;InfoBubble.prototype.setBackgroundColor=function(color){if(color){this.set('backgroundColor',color);}};InfoBubble.prototype['setBackgroundColor']=InfoBubble.prototype.setBackgroundColor;InfoBubble.prototype.backgroundColor_changed=function(){var backgroundColor=this.get('backgroundColor');this.contentContainer_.style['backgroundColor']=backgroundColor;this.arrowInner_.style['borderColor']=backgroundColor+' transparent transparent';this.updateTabStyles_();};InfoBubble.prototype['backgroundColor_changed']=InfoBubble.prototype.backgroundColor_changed;InfoBubble.prototype.setBorderColor=function(color){if(color){this.set('borderColor',color);}};InfoBubble.prototype['setBorderColor']=InfoBubble.prototype.setBorderColor;InfoBubble.prototype.borderColor_changed=function(){var borderColor=this.get('borderColor');var contentContainer=this.contentContainer_;var arrowOuter=this.arrowOuter_;contentContainer.style['borderColor']=borderColor;arrowOuter.style['borderColor']=borderColor+' transparent transparent';contentContainer.style['borderStyle']=arrowOuter.style['borderStyle']=this.arrowInner_.style['borderStyle']='solid';this.updateTabStyles_();};InfoBubble.prototype['borderColor_changed']=InfoBubble.prototype.borderColor_changed;InfoBubble.prototype.setBorderRadius=function(radius){this.set('borderRadius',radius);};InfoBubble.prototype['setBorderRadius']=InfoBubble.prototype.setBorderRadius;InfoBubble.prototype.getBorderRadius_=function(){return parseInt(this.get('borderRadius'),10)||0;};InfoBubble.prototype.borderRadius_changed=function(){var borderRadius=this.getBorderRadius_();var borderWidth=this.getBorderWidth_();this.contentContainer_.style['borderRadius']=this.contentContainer_.style['MozBorderRadius']=this.contentContainer_.style['webkitBorderRadius']=this.bubbleShadow_.style['borderRadius']=this.bubbleShadow_.style['MozBorderRadius']=this.bubbleShadow_.style['webkitBorderRadius']=this.px(borderRadius);this.tabsContainer_.style['paddingLeft']=this.tabsContainer_.style['paddingRight']=this.px(borderRadius+borderWidth);this.redraw_();};InfoBubble.prototype['borderRadius_changed']=InfoBubble.prototype.borderRadius_changed;InfoBubble.prototype.getBorderWidth_=function(){return parseInt(this.get('borderWidth'),10)||0;};InfoBubble.prototype.setBorderWidth=function(width){this.set('borderWidth',width);};InfoBubble.prototype['setBorderWidth']=InfoBubble.prototype.setBorderWidth;InfoBubble.prototype.borderWidth_changed=function(){var borderWidth=this.getBorderWidth_();this.contentContainer_.style['borderWidth']=this.px(borderWidth);this.tabsContainer_.style['top']=this.px(borderWidth);this.updateArrowStyle_();this.updateTabStyles_();this.borderRadius_changed();this.redraw_();};InfoBubble.prototype['borderWidth_changed']=InfoBubble.prototype.borderWidth_changed;InfoBubble.prototype.updateArrowStyle_=function(){var borderWidth=this.getBorderWidth_();var arrowSize=this.getArrowSize_();var arrowStyle=this.getArrowStyle_();var arrowOuterSizePx=this.px(arrowSize);var arrowInnerSizePx=this.px(Math.max(0,arrowSize-borderWidth));var outer=this.arrowOuter_;var inner=this.arrowInner_;this.arrow_.style['marginTop']=this.px(-borderWidth);outer.style['borderTopWidth']=arrowOuterSizePx;inner.style['borderTopWidth']=arrowInnerSizePx;if(arrowStyle==0||arrowStyle==1){outer.style['borderLeftWidth']=arrowOuterSizePx;inner.style['borderLeftWidth']=arrowInnerSizePx;}else{outer.style['borderLeftWidth']=inner.style['borderLeftWidth']=0;}
if(arrowStyle==0||arrowStyle==2){outer.style['borderRightWidth']=arrowOuterSizePx;inner.style['borderRightWidth']=arrowInnerSizePx;}else{outer.style['borderRightWidth']=inner.style['borderRightWidth']=0;}
if(arrowStyle<2){outer.style['marginLeft']=this.px(-(arrowSize));inner.style['marginLeft']=this.px(-(arrowSize-borderWidth));}else{outer.style['marginLeft']=inner.style['marginLeft']=0;}
if(borderWidth==0){outer.style['display']='none';}else{outer.style['display']='';}};InfoBubble.prototype.setPadding=function(padding){this.set('padding',padding);};InfoBubble.prototype['setPadding']=InfoBubble.prototype.setPadding;InfoBubble.prototype.setCloseSrc=function(src){if(src&&this.close_){this.close_.src=src;}};InfoBubble.prototype['setCloseSrc']=InfoBubble.prototype.setCloseSrc;InfoBubble.prototype.getPadding_=function(){return parseInt(this.get('padding'),10)||0;};InfoBubble.prototype.padding_changed=function(){var padding=this.getPadding_();this.contentContainer_.style['padding']=this.px(padding);this.updateTabStyles_();this.redraw_();};InfoBubble.prototype['padding_changed']=InfoBubble.prototype.padding_changed;InfoBubble.prototype.px=function(num){if(num){return num+'px';}
return num;};InfoBubble.prototype.addEvents_=function(){var events=['mousedown','mousemove','mouseover','mouseout','mouseup','mousewheel','DOMMouseScroll','touchstart','touchend','touchmove','dblclick','contextmenu','click'];var bubble=this.bubble_;this.listeners_=[];for(var i=0,event;event=events[i];i++){this.listeners_.push(google.maps.event.addDomListener(bubble,event,function(e){e.cancelBubble=true;if(e.stopPropagation){e.stopPropagation();}}));}};InfoBubble.prototype.onAdd=function(){if(!this.bubble_){this.buildDom_();}
this.addEvents_();var panes=this.getPanes();if(panes){panes.floatPane.appendChild(this.bubble_);panes.floatShadow.appendChild(this.bubbleShadow_);}
google.maps.event.trigger(this,'domready');};InfoBubble.prototype['onAdd']=InfoBubble.prototype.onAdd;InfoBubble.prototype.draw=function(){var projection=this.getProjection();if(!projection){return;}
var latLng=(this.get('position'));if(!latLng){this.close();return;}
var tabHeight=0;if(this.activeTab_){tabHeight=this.activeTab_.offsetHeight;}
var anchorHeight=this.getAnchorHeight_();var arrowSize=this.getArrowSize_();var arrowPosition=this.getArrowPosition_();arrowPosition=arrowPosition/100;var pos=projection.fromLatLngToDivPixel(latLng);var width=this.contentContainer_.offsetWidth;var height=this.bubble_.offsetHeight;if(!width){return;}
var top=pos.y-(height+arrowSize);if(anchorHeight){top-=anchorHeight;}
var left=pos.x-(width*arrowPosition);this.bubble_.style['top']=this.px(top);this.bubble_.style['left']=this.px(left);var shadowStyle=parseInt(this.get('shadowStyle'),10);switch(shadowStyle){case 1:this.bubbleShadow_.style['top']=this.px(top+tabHeight-1);this.bubbleShadow_.style['left']=this.px(left);this.bubbleShadow_.style['width']=this.px(width);this.bubbleShadow_.style['height']=this.px(this.contentContainer_.offsetHeight-arrowSize);break;case 2:width=width*0.8;if(anchorHeight){this.bubbleShadow_.style['top']=this.px(pos.y);}else{this.bubbleShadow_.style['top']=this.px(pos.y+arrowSize);}
this.bubbleShadow_.style['left']=this.px(pos.x-width*arrowPosition);this.bubbleShadow_.style['width']=this.px(width);this.bubbleShadow_.style['height']=this.px(2);break;}};InfoBubble.prototype['draw']=InfoBubble.prototype.draw;InfoBubble.prototype.onRemove=function(){if(this.bubble_&&this.bubble_.parentNode){this.bubble_.parentNode.removeChild(this.bubble_);}
if(this.bubbleShadow_&&this.bubbleShadow_.parentNode){this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);}
for(var i=0,listener;listener=this.listeners_[i];i++){google.maps.event.removeListener(listener);}};InfoBubble.prototype['onRemove']=InfoBubble.prototype.onRemove;InfoBubble.prototype.isOpen=function(){return this.isOpen_;};InfoBubble.prototype['isOpen']=InfoBubble.prototype.isOpen;InfoBubble.prototype.close=function(){if(this.bubble_){this.bubble_.style['display']='none';this.bubble_.className=this.bubble_.className.replace(this.animationName_,'');}
if(this.bubbleShadow_){this.bubbleShadow_.style['display']='none';this.bubbleShadow_.className=this.bubbleShadow_.className.replace(this.animationName_,'');}
this.isOpen_=false;};InfoBubble.prototype['close']=InfoBubble.prototype.close;InfoBubble.prototype.open=function(opt_map,opt_anchor){var that=this;window.setTimeout(function(){that.open_(opt_map,opt_anchor);},0);};InfoBubble.prototype.open_=function(opt_map,opt_anchor){this.updateContent_();if(opt_map){this.setMap(opt_map);}
if(opt_anchor){this.set('anchor',opt_anchor);this.bindTo('anchorPoint',opt_anchor);this.bindTo('position',opt_anchor);}
this.bubble_.style['display']=this.bubbleShadow_.style['display']='';var animation=!this.get('disableAnimation');if(animation){this.bubble_.className+=' '+this.animationName_;this.bubbleShadow_.className+=' '+this.animationName_;}
this.redraw_();this.isOpen_=true;var pan=!this.get('disableAutoPan');if(pan){var that=this;window.setTimeout(function(){that.panToView();},200);}};InfoBubble.prototype['open']=InfoBubble.prototype.open;InfoBubble.prototype.setPosition=function(position){if(position){this.set('position',position);}};InfoBubble.prototype['setPosition']=InfoBubble.prototype.setPosition;InfoBubble.prototype.getPosition=function(){return(this.get('position'));};InfoBubble.prototype['getPosition']=InfoBubble.prototype.getPosition;InfoBubble.prototype.position_changed=function(){this.draw();};InfoBubble.prototype['position_changed']=InfoBubble.prototype.position_changed;InfoBubble.prototype.panToView=function(){var projection=this.getProjection();if(!projection){return;}
if(!this.bubble_){return;}
var anchorHeight=this.getAnchorHeight_();var height=this.bubble_.offsetHeight+anchorHeight;var map=this.get('map');var mapDiv=map.getDiv();var mapHeight=mapDiv.offsetHeight;var latLng=this.getPosition();var centerPos=projection.fromLatLngToContainerPixel(map.getCenter());var pos=projection.fromLatLngToContainerPixel(latLng);var spaceTop=centerPos.y-height;var spaceBottom=mapHeight-centerPos.y;var needsTop=spaceTop<0;var deltaY=0;if(needsTop){spaceTop*=-1;deltaY=(spaceTop+spaceBottom)/2;}
pos.y-=deltaY;latLng=projection.fromContainerPixelToLatLng(pos);if(map.getCenter()!=latLng){map.panTo(latLng);}};InfoBubble.prototype['panToView']=InfoBubble.prototype.panToView;InfoBubble.prototype.htmlToDocumentFragment_=function(htmlString){htmlString=htmlString.replace(/^\s*([\S\s]*)\b\s*$/,'$1');var tempDiv=document.createElement('DIV');tempDiv.innerHTML=htmlString;if(tempDiv.childNodes.length==1){return(tempDiv.removeChild(tempDiv.firstChild));}else{var fragment=document.createDocumentFragment();while(tempDiv.firstChild){fragment.appendChild(tempDiv.firstChild);}
return fragment;}};InfoBubble.prototype.removeChildren_=function(node){if(!node){return;}
var child;while(child=node.firstChild){node.removeChild(child);}};InfoBubble.prototype.setContent=function(content){this.set('content',content);};InfoBubble.prototype['setContent']=InfoBubble.prototype.setContent;InfoBubble.prototype.getContent=function(){return(this.get('content'));};InfoBubble.prototype['getContent']=InfoBubble.prototype.getContent;InfoBubble.prototype.updateContent_=function(){if(!this.content_){return;}
this.removeChildren_(this.content_);var content=this.getContent();if(content){if(typeof content=='string'){content=this.htmlToDocumentFragment_(content);}
this.content_.appendChild(content);var that=this;var images=this.content_.getElementsByTagName('IMG');for(var i=0,image;image=images[i];i++){google.maps.event.addDomListener(image,'load',function(){that.imageLoaded_();});}}
this.redraw_();};InfoBubble.prototype.imageLoaded_=function(){var pan=!this.get('disableAutoPan');this.redraw_();if(pan&&(this.tabs_.length==0||this.activeTab_.index==0)){this.panToView();}};InfoBubble.prototype.updateTabStyles_=function(){if(this.tabs_&&this.tabs_.length){for(var i=0,tab;tab=this.tabs_[i];i++){this.setTabStyle_(tab.tab);}
this.activeTab_.style['zIndex']=this.baseZIndex_;var borderWidth=this.getBorderWidth_();var padding=this.getPadding_()/2;this.activeTab_.style['borderBottomWidth']=0;this.activeTab_.style['paddingBottom']=this.px(padding+borderWidth);}};InfoBubble.prototype.setTabStyle_=function(tab){var backgroundColor=this.get('backgroundColor');var borderColor=this.get('borderColor');var borderRadius=this.getBorderRadius_();var borderWidth=this.getBorderWidth_();var padding=this.getPadding_();var marginRight=this.px(-(Math.max(padding,borderRadius)));var borderRadiusPx=this.px(borderRadius);var index=this.baseZIndex_;if(tab.index){index-=tab.index;}
var styles={'cssFloat':'left','position':'relative','cursor':'pointer','backgroundColor':backgroundColor,'border':this.px(borderWidth)+' solid '+borderColor,'padding':this.px(padding/2)+' '+this.px(padding),'marginRight':marginRight,'whiteSpace':'nowrap','borderRadiusTopLeft':borderRadiusPx,'MozBorderRadiusTopleft':borderRadiusPx,'webkitBorderTopLeftRadius':borderRadiusPx,'borderRadiusTopRight':borderRadiusPx,'MozBorderRadiusTopright':borderRadiusPx,'webkitBorderTopRightRadius':borderRadiusPx,'zIndex':index,'display':'inline'};for(var style in styles){tab.style[style]=styles[style];}
var className=this.get('tabClassName');if(className!=undefined){tab.className+=' '+className;}};InfoBubble.prototype.addTabActions_=function(tab){var that=this;tab.listener_=google.maps.event.addDomListener(tab,'click',function(){that.setTabActive_(this);});};InfoBubble.prototype.setTabActive=function(index){var tab=this.tabs_[index-1];if(tab){this.setTabActive_(tab.tab);}};InfoBubble.prototype['setTabActive']=InfoBubble.prototype.setTabActive;InfoBubble.prototype.setTabActive_=function(tab){if(!tab){this.setContent('');this.updateContent_();return;}
var padding=this.getPadding_()/2;var borderWidth=this.getBorderWidth_();if(this.activeTab_){var activeTab=this.activeTab_;activeTab.style['zIndex']=this.baseZIndex_-activeTab.index;activeTab.style['paddingBottom']=this.px(padding);activeTab.style['borderBottomWidth']=this.px(borderWidth);}
tab.style['zIndex']=this.baseZIndex_;tab.style['borderBottomWidth']=0;tab.style['marginBottomWidth']='-10px';tab.style['paddingBottom']=this.px(padding+borderWidth);this.setContent(this.tabs_[tab.index].content);this.updateContent_();this.activeTab_=tab;this.redraw_();};InfoBubble.prototype.setMaxWidth=function(width){this.set('maxWidth',width);};InfoBubble.prototype['setMaxWidth']=InfoBubble.prototype.setMaxWidth;InfoBubble.prototype.maxWidth_changed=function(){this.redraw_();};InfoBubble.prototype['maxWidth_changed']=InfoBubble.prototype.maxWidth_changed;InfoBubble.prototype.setMaxHeight=function(height){this.set('maxHeight',height);};InfoBubble.prototype['setMaxHeight']=InfoBubble.prototype.setMaxHeight;InfoBubble.prototype.maxHeight_changed=function(){this.redraw_();};InfoBubble.prototype['maxHeight_changed']=InfoBubble.prototype.maxHeight_changed;InfoBubble.prototype.setMinWidth=function(width){this.set('minWidth',width);};InfoBubble.prototype['setMinWidth']=InfoBubble.prototype.setMinWidth;InfoBubble.prototype.minWidth_changed=function(){this.redraw_();};InfoBubble.prototype['minWidth_changed']=InfoBubble.prototype.minWidth_changed;InfoBubble.prototype.setMinHeight=function(height){this.set('minHeight',height);};InfoBubble.prototype['setMinHeight']=InfoBubble.prototype.setMinHeight;InfoBubble.prototype.minHeight_changed=function(){this.redraw_();};InfoBubble.prototype['minHeight_changed']=InfoBubble.prototype.minHeight_changed;InfoBubble.prototype.addTab=function(label,content){var tab=document.createElement('DIV');tab.innerHTML=label;this.setTabStyle_(tab);this.addTabActions_(tab);this.tabsContainer_.appendChild(tab);this.tabs_.push({label:label,content:content,tab:tab});tab.index=this.tabs_.length-1;tab.style['zIndex']=this.baseZIndex_-tab.index;if(!this.activeTab_){this.setTabActive_(tab);}
tab.className=tab.className+' '+this.animationName_;this.redraw_();};InfoBubble.prototype['addTab']=InfoBubble.prototype.addTab;InfoBubble.prototype.updateTab=function(index,opt_label,opt_content){if(!this.tabs_.length||index<0||index>=this.tabs_.length){return;}
var tab=this.tabs_[index];if(opt_label!=undefined){tab.tab.innerHTML=tab.label=opt_label;}
if(opt_content!=undefined){tab.content=opt_content;}
if(this.activeTab_==tab.tab){this.setContent(tab.content);this.updateContent_();}
this.redraw_();};InfoBubble.prototype['updateTab']=InfoBubble.prototype.updateTab;InfoBubble.prototype.removeTab=function(index){if(!this.tabs_.length||index<0||index>=this.tabs_.length){return;}
var tab=this.tabs_[index];tab.tab.parentNode.removeChild(tab.tab);google.maps.event.removeListener(tab.tab.listener_);this.tabs_.splice(index,1);delete tab;for(var i=0,t;t=this.tabs_[i];i++){t.tab.index=i;}
if(tab.tab==this.activeTab_){if(this.tabs_[index]){this.activeTab_=this.tabs_[index].tab;}else if(this.tabs_[index-1]){this.activeTab_=this.tabs_[index-1].tab;}else{this.activeTab_=undefined;}
this.setTabActive_(this.activeTab_);}
this.redraw_();};InfoBubble.prototype['removeTab']=InfoBubble.prototype.removeTab;InfoBubble.prototype.getElementSize_=function(element,opt_maxWidth,opt_maxHeight){var sizer=document.createElement('DIV');sizer.style['display']='inline';sizer.style['position']='absolute';sizer.style['visibility']='hidden';if(typeof element=='string'){sizer.innerHTML=element;}else{sizer.appendChild(element.cloneNode(true));}
document.body.appendChild(sizer);var size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);if(opt_maxWidth&&size.width>opt_maxWidth){sizer.style['width']=this.px(opt_maxWidth);size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);}
if(opt_maxHeight&&size.height>opt_maxHeight){sizer.style['height']=this.px(opt_maxHeight);size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);}
document.body.removeChild(sizer);delete sizer;return size;};InfoBubble.prototype.redraw_=function(){this.figureOutSize_();this.positionCloseButton_();this.draw();};InfoBubble.prototype.figureOutSize_=function(){var map=this.get('map');if(!map){return;}
var padding=this.getPadding_();var borderWidth=this.getBorderWidth_();var borderRadius=this.getBorderRadius_();var arrowSize=this.getArrowSize_();var mapDiv=map.getDiv();var gutter=arrowSize*2;var mapWidth=mapDiv.offsetWidth-gutter;var mapHeight=mapDiv.offsetHeight-gutter-this.getAnchorHeight_();var tabHeight=0;var width=(this.get('minWidth')||0);var height=(this.get('minHeight')||0);var maxWidth=(this.get('maxWidth')||0);var maxHeight=(this.get('maxHeight')||0);maxWidth=Math.min(mapWidth,maxWidth);maxHeight=Math.min(mapHeight,maxHeight);var tabWidth=0;if(this.tabs_.length){for(var i=0,tab;tab=this.tabs_[i];i++){var tabSize=this.getElementSize_(tab.tab,maxWidth,maxHeight);var contentSize=this.getElementSize_(tab.content,maxWidth,maxHeight);if(width<tabSize.width){width=tabSize.width;}
tabWidth+=tabSize.width;if(height<tabSize.height){height=tabSize.height;}
if(tabSize.height>tabHeight){tabHeight=tabSize.height;}
if(width<contentSize.width){width=contentSize.width;}
if(height<contentSize.height){height=contentSize.height;}}}else{var content=(this.get('content'));if(typeof content=='string'){content=this.htmlToDocumentFragment_(content);}
if(content){var contentSize=this.getElementSize_(content,maxWidth,maxHeight);if(width<contentSize.width){width=contentSize.width;}
if(height<contentSize.height){height=contentSize.height;}}}
if(maxWidth){width=Math.min(width,maxWidth);}
if(maxHeight){height=Math.min(height,maxHeight);}
width=Math.max(width,tabWidth);if(width==tabWidth){width=width+2*padding;}
arrowSize=arrowSize*2;width=Math.max(width,arrowSize);if(width>mapWidth){width=mapWidth;}
if(height>mapHeight){height=mapHeight-tabHeight;}
if(this.tabsContainer_){this.tabHeight_=tabHeight;this.tabsContainer_.style['width']=this.px(tabWidth);}
this.contentContainer_.style['width']=this.px(width);this.contentContainer_.style['height']=this.px(height);};InfoBubble.prototype.getAnchorHeight_=function(){var anchor=this.get('anchor');if(anchor){var anchorPoint=(this.get('anchorPoint'));if(anchorPoint){return-1*anchorPoint.y;}}
return 0;};InfoBubble.prototype.anchorPoint_changed=function(){this.draw();};InfoBubble.prototype['anchorPoint_changed']=InfoBubble.prototype.anchorPoint_changed;InfoBubble.prototype.positionCloseButton_=function(){var br=this.getBorderRadius_();var bw=this.getBorderWidth_();var right=2;var top=2;if(this.tabs_.length&&this.tabHeight_){top+=this.tabHeight_;}
top+=bw;right+=bw;var c=this.contentContainer_;if(c&&c.clientHeight<c.scrollHeight){right+=15;}
this.close_.style['right']=this.px(right);this.close_.style['top']=this.px(top);};// Copyright (c) Sindre Sorhus https://github.com/sindresorhus/screenfull.js/

(function(){'use strict';var document=typeof window!=='undefined'&&typeof window.document!=='undefined'?window.document:{};var isCommonjs=typeof module!=='undefined'&&module.exports;var keyboardAllowed=typeof Element!=='undefined'&&'ALLOW_KEYBOARD_INPUT'in Element;var fn=(function(){var val;var fnMap=[['requestFullscreen','exitFullscreen','fullscreenElement','fullscreenEnabled','fullscreenchange','fullscreenerror'],['webkitRequestFullscreen','webkitExitFullscreen','webkitFullscreenElement','webkitFullscreenEnabled','webkitfullscreenchange','webkitfullscreenerror'],['webkitRequestFullScreen','webkitCancelFullScreen','webkitCurrentFullScreenElement','webkitCancelFullScreen','webkitfullscreenchange','webkitfullscreenerror'],['mozRequestFullScreen','mozCancelFullScreen','mozFullScreenElement','mozFullScreenEnabled','mozfullscreenchange','mozfullscreenerror'],['msRequestFullscreen','msExitFullscreen','msFullscreenElement','msFullscreenEnabled','MSFullscreenChange','MSFullscreenError']];var i=0;var l=fnMap.length;var ret={};for(;i<l;i++){val=fnMap[i];if(val&&val[1]in document){for(i=0;i<val.length;i++){ret[fnMap[0][i]]=val[i];}
return ret;}}
return false;})();var eventNameMap={change:fn.fullscreenchange,error:fn.fullscreenerror};var screenfull={request:function(elem){var request=fn.requestFullscreen;elem=elem||document.documentElement;if(/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)){return elem[request]();}else{return elem[request]({navigationUI:(keyboardAllowed&&Element.ALLOW_KEYBOARD_INPUT)?'show':'hide'});}},exit:function(){document[fn.exitFullscreen]();},toggle:function(elem){if(this.isFullscreen){this.exit();}else{this.request(elem);}},onchange:function(callback){this.on('change',callback);},onerror:function(callback){this.on('error',callback);},on:function(event,callback){var eventName=eventNameMap[event];if(eventName){document.addEventListener(eventName,callback,false);}},off:function(event,callback){var eventName=eventNameMap[event];if(eventName){document.removeEventListener(eventName,callback,false);}},raw:fn};if(!fn){if(isCommonjs){module.exports=false;}else{window.screenfull=false;}
return;}
Object.defineProperties(screenfull,{isFullscreen:{get:function(){return Boolean(document[fn.fullscreenElement]);}},element:{enumerable:true,get:function(){return document[fn.fullscreenElement];}},enabled:{enumerable:true,get:function(){return Boolean(document[fn.fullscreenEnabled]);}}});if(isCommonjs){module.exports=screenfull;}else{window.screenfull=screenfull;}})();// Copyright (c) https://github.com/fgnass/spin.js/

﻿var __assign=(this&&this.__assign)||Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)
if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}
return t;};var defaults={lines:12,length:7,width:5,radius:10,scale:1.0,corners:1,color:'#000',fadeColor:'transparent',opacity:0.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:'spinner',top:'50%',left:'50%',shadow:'none',position:'absolute',};var Spinner=(function(){function Spinner(opts){if(opts===void 0){opts={};}
this.opts=__assign({},defaults,opts);}
Spinner.prototype.spin=function(target){var _this=this;this.stop();this.el=document.createElement('div');this.el.className=this.opts.className;this.el.setAttribute('role','progressbar');css(this.el,{position:this.opts.position,width:0,zIndex:this.opts.zIndex,left:this.opts.left,top:this.opts.top,transform:"scale("+this.opts.scale+")",});if(target){target.insertBefore(this.el,target.firstChild||null);}
var animator;var getNow;if(typeof requestAnimationFrame!=='undefined'){animator=requestAnimationFrame;getNow=function(){return performance.now();};}else{animator=function(callback){return setTimeout(callback,1000/_this.opts.fps);};getNow=function(){return Date.now();};}
var lastFrameTime;var state=0;var animate=function(){var time=getNow();if(lastFrameTime===undefined){lastFrameTime=time-1;}
state+=getAdvancePercentage(time-lastFrameTime,_this.opts.speed);lastFrameTime=time;if(state>1){state-=Math.floor(state);}
if(_this.el.childNodes.length===_this.opts.lines){for(var line=0;line<_this.opts.lines;line++){var opacity=getLineOpacity(line,state,_this.opts);_this.el.childNodes[line].childNodes[0].style.opacity=opacity.toString();}}
_this.animateId=_this.el?animator(animate):undefined;};drawLines(this.el,this.opts);animate();return this;};Spinner.prototype.stop=function(){if(this.el){if(typeof requestAnimationFrame!=='undefined'){cancelAnimationFrame(this.animateId);}else{clearTimeout(this.animateId);}
if(this.el.parentNode){this.el.parentNode.removeChild(this.el);}
this.el=undefined;}
return this;};return Spinner;}());function getAdvancePercentage(msSinceLastFrame,roundsPerSecond){return msSinceLastFrame/1000*roundsPerSecond;}
function getLineOpacity(line,state,opts){var linePercent=(line+1)/opts.lines;var diff=state-(linePercent*opts.direction);if(diff<0||diff>1){diff+=opts.direction;}
var trailPercent=opts.trail/100;var opacityPercent=1-diff/trailPercent;if(opacityPercent<0){return opts.opacity;}
var opacityDiff=1-opts.opacity;return opacityPercent*opacityDiff+opts.opacity;}
function vendor(el,prop){if(el.style[prop]!==undefined){return prop;}
var prefixed='ms'+prop.charAt(0).toUpperCase()+prop.slice(1);if(el.style[prefixed]!==undefined){return prefixed;}
return'';}
function css(el,props){for(var prop in props){el.style[vendor(el,prop)||prop]=props[prop];}
return el;}
function getColor(color,idx){return typeof color=='string'?color:color[idx%color.length];}
function drawLines(el,opts){var borderRadius=(Math.round(opts.corners*opts.width*500)/1000)+'px';var shadow='none';if(opts.shadow===true){shadow='0 2px 4px #000';}else if(typeof opts.shadow==='string'){shadow=opts.shadow;}
var shadows=parseBoxShadow(shadow);for(var i=0;i<opts.lines;i++){var degrees=~~(360/opts.lines*i+opts.rotate);var backgroundLine=css(document.createElement('div'),{position:'absolute',top:-opts.width/2+"px",width:(opts.length+opts.width)+'px',height:opts.width+'px',background:getColor(opts.fadeColor,i),borderRadius:borderRadius,transformOrigin:'left',transform:"rotate("+degrees+"deg) translateX("+opts.radius+"px)",});var line=css(document.createElement('div'),{width:'100%',height:'100%',background:getColor(opts.color,i),borderRadius:borderRadius,boxShadow:normalizeShadow(shadows,degrees),opacity:opts.opacity,});backgroundLine.appendChild(line);el.appendChild(backgroundLine);}}
function parseBoxShadow(boxShadow){var regex=/^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;var shadows=[];for(var _i=0,_a=boxShadow.split(',');_i<_a.length;_i++){var shadow=_a[_i];var matches=shadow.match(regex);if(matches===null){continue;}
var x=+matches[2];var y=+matches[5];var xUnits=matches[4];var yUnits=matches[7];if(x===0&&!xUnits){xUnits=yUnits;}
if(y===0&&!yUnits){yUnits=xUnits;}
if(xUnits!==yUnits){continue;}
shadows.push({prefix:matches[1]||'',x:x,y:y,xUnits:xUnits,yUnits:yUnits,end:matches[8],});}
return shadows;}
function normalizeShadow(shadows,degrees){var normalized=[];for(var _i=0,shadows_1=shadows;_i<shadows_1.length;_i++){var shadow=shadows_1[_i];var xy=convertOffset(shadow.x,shadow.y,degrees);normalized.push(shadow.prefix+xy[0]+shadow.xUnits+' '+xy[1]+shadow.yUnits+shadow.end);}
return normalized.join(', ');}
function convertOffset(x,y,degrees){var radians=degrees*Math.PI/180;var sin=Math.sin(radians);var cos=Math.cos(radians);return[Math.round((x*cos+y*sin)*1000)/1000,Math.round((-x*sin+y*cos)*1000)/1000,];}