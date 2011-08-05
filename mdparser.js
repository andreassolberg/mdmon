var 
	// Dependencies
	libxmljs = require("libxmljs"),
	
	// Local variables
	
	// Local variables (EXPORTS)
	constants,
	parseFromString;

constants = {
	'ns' : {
		'md': "urn:oasis:names:tc:SAML:2.0:metadata",
		'mdui': "urn:oasis:names:tc:SAML:metadata:ui",
		'mdattr': "urn:oasis:names:tc:SAML:metadata:attribute",
		'saml': "urn:oasis:names:tc:SAML:2.0:assertion",
		'xsd': "http://www.w3.org/2001/XMLSchema",
		'ds': "http://www.w3.org/2000/09/xmldsig#",
		'idpdisc': 'urn:oasis:names:tc:SAML:profiles:SSO:idp-discovery-protocol'
	},
	'certusage': {
		'both': 'Both',
		'signing': 'Signing',
		'encryption': 'Encryption'
	},
	'languages': {
		'en': 'English',
		'no': 'Norwegian (bokmål)',
		'nn': 'Norwegian (nynorsk)',
		'se': 'Sámegiella',
		'da': 'Danish',
		'de': 'German',
		'sv': 'Swedish',
		'fi': 'Finnish',
		'es': 'Español',
		'fr': 'Français',
		'it': 'Italian',
		'nl': 'Nederlands',
		'lb': 'Luxembourgish', 
		'cs': 'Czech',
		'sl': 'Slovenščina',
		'lt': 'Lietuvių kalba',
		'hr': 'Hrvatski',
		'hu': 'Magyar',
		'pl': 'Język polski',
		'pt': 'Português',
		'pt-BR': 'Português brasileiro',
		'tr': 'Türkçe',
		'el': 'ελληνικά',
		'ja': 'Japanese (日本語)'
	},
	'contactTypes' : {
		'admin' : 'Administrative',
		'technical': 'Technical',
		'support': 'Support'
	},
	'endpointTypes' : {
		'sp': {
			'AssertionConsumerService': 'AssertionConsumerService',
			'SingleLogoutService': 'SingleLogoutService'
		},
		'idp' : {}
	},
	'bindings': {
		'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect': 'HTTP Redirect',
		'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST': 'HTTP POST',
		'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact': 'HTTP Artifact',
		'urn:oasis:names:tc:SAML:2.0:bindings:SOAP': 'SOAP',
		'urn:oasis:names:tc:SAML:2.0:bindings:PAOS': 'Reverse SOAP (PAOS)'
	},
	'attributes' : {
		'urn:oid:0.9.2342.19200300.100.1.1': 'uid',
		'urn:oid:0.9.2342.19200300.100.1.10': 'manager',
		'urn:oid:0.9.2342.19200300.100.1.2': 'textEncodedORAddress',
		'urn:oid:0.9.2342.19200300.100.1.20': 'homePhone',
		'urn:oid:0.9.2342.19200300.100.1.22': 'otherMailbox',
		'urn:oid:0.9.2342.19200300.100.1.3': 'mail',
		'urn:oid:0.9.2342.19200300.100.1.39': 'homePostalAddress',
		'urn:oid:0.9.2342.19200300.100.1.40': 'personalTitle',
		'urn:oid:0.9.2342.19200300.100.1.41': 'mobile',
		'urn:oid:0.9.2342.19200300.100.1.42': 'pager',
		'urn:oid:0.9.2342.19200300.100.1.43': 'co',
		'urn:oid:0.9.2342.19200300.100.1.6': 'roomNumber',
		'urn:oid:0.9.2342.19200300.100.1.60': 'jpegPhoto',
		'urn:oid:0.9.2342.19200300.100.1.7': 'photo',
		'urn:oid:1.2.840.113549.1.9.1': 'email',
		'urn:oid:1.3.6.1.4.1.2428.90.1.1': 'norEduOrgUniqueNumber',
		'urn:oid:1.3.6.1.4.1.2428.90.1.11': 'norEduOrgSchemaVersion',
		'urn:oid:1.3.6.1.4.1.2428.90.1.12': 'norEduOrgNIN',
		'urn:oid:1.3.6.1.4.1.2428.90.1.2': 'norEduOrgUnitUniqueNumber',
		'urn:oid:1.3.6.1.4.1.2428.90.1.3': 'norEduPersonBirthDate',
		'urn:oid:1.3.6.1.4.1.2428.90.1.4': 'norEduPersonLIN',
		'urn:oid:1.3.6.1.4.1.2428.90.1.5': 'norEduPersonNIN',
		'urn:oid:1.3.6.1.4.1.2428.90.1.6': 'norEduOrgAcronym',
		'urn:oid:1.3.6.1.4.1.2428.90.1.7': 'norEduOrgUniqueIdentifier',
		'urn:oid:1.3.6.1.4.1.2428.90.1.8': 'norEduOrgUnitUniqueIdentifier',
		'urn:oid:1.3.6.1.4.1.2428.90.1.9': 'federationFeideSchemaVersion',
		'urn:oid:1.3.6.1.4.1.250.1.57': 'labeledURI',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'eduPersonAffiliation',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.10': 'eduPersonTargetedID',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.2': 'eduPersonNickname',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.3': 'eduPersonOrgDN',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.4': 'eduPersonOrgUnitDN',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.5': 'eduPersonPrimaryAffiliation',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eduPersonPrincipalName',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.7': 'eduPersonEntitlement',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.8': 'eduPersonPrimaryOrgUnitDN',
		'urn:oid:1.3.6.1.4.1.5923.1.1.1.9': 'eduPersonScopedAffiliation',
		'urn:oid:1.3.6.1.4.1.5923.1.2.1.2': 'eduOrgHomePageURI',
		'urn:oid:1.3.6.1.4.1.5923.1.2.1.3': 'eduOrgIdentityAuthNPolicyURI',
		'urn:oid:1.3.6.1.4.1.5923.1.2.1.4': 'eduOrgLegalName',
		'urn:oid:1.3.6.1.4.1.5923.1.2.1.5': 'eduOrgSuperiorURI',
		'urn:oid:1.3.6.1.4.1.5923.1.2.1.6': 'eduOrgWhitePagesURI',
		'urn:oid:1.3.6.1.4.1.5923.1.5.1.1': 'isMemberOf',
		'urn:oid:2.16.840.1.113730.3.1.241': 'displayName',
		'urn:oid:2.16.840.1.113730.3.1.3': 'employeeNumber',
		'urn:oid:2.16.840.1.113730.3.1.39': 'preferredLanguage',
		'urn:oid:2.16.840.1.113730.3.1.4': 'employeeType',
		'urn:oid:2.16.840.1.113730.3.1.40': 'userSMIMECertificate',
		'urn:oid:2.5.4.10': 'o',
		'urn:oid:2.5.4.11': 'ou',
		'urn:oid:2.5.4.12': 'title',
		'urn:oid:2.5.4.13': 'description',
		'urn:oid:2.5.4.16': 'postalAddress',
		'urn:oid:2.5.4.17': 'postalCode',
		'urn:oid:2.5.4.18': 'postOfficeBox',
		'urn:oid:2.5.4.19': 'physicalDeliveryOfficeName',
		'urn:oid:2.5.4.20': 'telephoneNumber',
		'urn:oid:2.5.4.21': 'telexNumber',
		'urn:oid:2.5.4.3': 'cn',
		'urn:oid:2.5.4.36': 'userCertificate',
		'urn:oid:2.5.4.4': 'sn',
		'urn:oid:2.5.4.41': 'name',
		'urn:oid:2.5.4.42': 'givenName',
		'urn:oid:2.5.4.7': 'l',
		'urn:oid:2.5.4.9': 'street'
	}
};




function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			return false;
	}
	return true;
}

/*
 * Set of helper functions
 */
function debugElement (text, node) {
	if (node === null) {
		console.log(text + ': is NULL');
		return;
	}
// 	if (isEmpty(node)) {
// 		console.log(text + ': is empty object');
// 		return;
// 	}
	
	for (var key in node) {
		// console.log('Element property: ' + key + ' : ' + node[key]);
	}
	
	//console.log('type: ' + node.name());
	
	console.log(node);
	console.log(text + ': <' + node.namespace().href() + ':' + node.name() + '>');
}

function hasAttribute(node, attribute, value) {

	var attr = node.attr(attribute);
	if (!attr) return false;
	
	var attrs = attr.value().split(" ");
	for(key in attrs) {
		if (attrs[key] == value) return true;
	}
	return false;
}

function findChildElement (node, list) {
	// Iterate the root children
	var i, j, childNodes, currentChild;
	
	childNodes = node.childNodes();
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		// if(currentChild.nodeType !== 1) continue; // Process only elements.

		for(j = 0; j < list.length; j++) {
			if (list[j].localName == currentChild.name() && 
				list[j].namespaceURI == currentChild.namespace().href()
				) {
				return currentChild;
			}
		}
	}
	return null;
}

function getText (node) {
	
	var i, currentChild, childNodes, str;
	
	childNodes = node.childNodes();
	if (!childNodes) return;
	
	str = '';
	for (i = 0; i < childNodes.length; i++ ) {
		//if (childNodes[i].nodeType == 3) {
			str += childNodes[i].text();
		//} 
	}
	str = str.replace(/\s+/g, ' ');
	str = str.replace(/^\s*/g, '');
	str = str.replace(/\s*$/g, '');
	return str;
}


function checkNode(node, name, namespace) {

	if (!node) return false;

	if (node.name() !== name) return false;
	if (!node.namespace) return false;
	if (!node.namespace()) return false;
	if (!node.namespace().href) return false;
	if (node.namespace().href() !== namespace) return false;
	
	return true;
}

function getAttribute(element, name, defaultvalue) {
	if(!element.attr(name)) return defaultvalue;
	return element.attr(name).value();	
}


/*
 * Set of helper Parser functions
 */

function getEntitiesDescriptor(root) {
	
	var 
		newitem,
		
		i,
		childNodes,
		currentChild,
		
		// Reset the result object as we stat over again from scratch.
		entities = {};
	

	console.log('getEntitiesDescriptor()');

	debugElement('root', root);
	
	if (!checkNode(root, 'EntitiesDescriptor', constants.ns.md)) {
		console.log('Root not was not recognized as a EntitiesDescriptor node in correct namespace.');
		return entities;
	}

	childNodes = root.childNodes();

	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		

		
		debugElement('Child of EntitiesDescriptor', currentChild);
		
		if (!checkNode(currentChild, 'EntityDescriptor', constants.ns.md)) {
			console.log('EntityDescriptor not was not recognized as a EntityDescriptor node in correct namespace.');
			continue;
		}
		
		newitem = getEntityDescriptor(currentChild);
		newitem.text = JSON.stringify(newitem);
		
		if (newitem.entityid) {
			entities[newitem.entityid] = newitem;
		} else {
			console.log('Could not add entry, because entityid was missing');
		}

		
		
		// console.log('Process EntityDescriptor');
	

	}
	return entities;
	
}



function getEntityDescriptor(element) {

	var 
		// Reset the result object as we stat over again from scratch.
		entity = {},
		
		i,
		childNodes,
		currentChild,
		
		validuntil, validuntilDate
		;
	
	// Peek at the root node, and verify.
	if (!checkNode(element, 'EntityDescriptor', constants.ns.md)) {
		console.log('Element not was not recognized as a EntityDescriptor node in correct namespace.');
		return entity;
	}
	entity.certs = [];
	entity.status = [];
	entity.entityid = element.attr('entityID').value();
	
	if (element.attr('validUntil')) {
		
		validuntil = element.attr('validUntil').value();		
		validuntilDate = new Date(validuntil);
		entity.validUntil = validuntilDate.getTime();
		
	}
	

	
	childNodes = element.childNodes();

	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		
		// nodeType 1 is Element
		// if (currentChild.nodeType !== 1) continue;
		
		if (currentChild.type() !== 'element') continue;

		switch(currentChild.name() ) {

			case 'Extensions':
//				this.parseEntityExtensions(resultObject, currentChild);
				break;

			// Handle the SPSSODescriptor
			case 'SPSSODescriptor': 

				if (hasAttribute(currentChild, 'protocolSupportEnumeration', 'urn:oasis:names:tc:SAML:2.0:protocol'))  {
					getSPSSODescriptor(entity, currentChild);
				}
				break;
			
			case 'AttributeAuthorityDescriptor':
				break;
			
			case 'IDPSSODescriptor':
				entity.status.push({status: 3, title: 'Parsing of this element, not yet implemented [' + currentChild.name() + ']'});
				break;
			
			case 'Organization':
				getOrganization(entity, currentChild);
				break;
				
			case 'ContactPerson':
				console.log('Get contact person for this entity');
				console.log(entity);
				getContactPerson(entity, currentChild);

				break;
			
			case 'text':
				break;

			default:
				entity.status.push({status: 2, title: 'Found unknown child element of EntityDescriptor [' + currentChild.name() + ']'});

		}

	}
	

	
	entity.name = getName(entity);
	entity.descr = getDescr(entity);
	entity.title = getTitle(entity);
	
	if (!entity.name) 
		entity.status.push({status: 2, title: 'Could not get a proper name of this entity (mdui.DisplayName, AttributeConsumingService.ServiceName, OrganizationDisplayName)'});
	
	return entity;

}

function getTitle(entity) {
	var name = getName(entity);
	if(name && name['en']) return name['en'];
	return entity.entityid;
}

function getName(entity) {
	if (entity.mdui && entity.mdui.DisplayName) 
		return entity.mdui.DisplayName;
	if (entity.AttributeConsumingService && entity.AttributeConsumingService.ServiceName) 
		return entity.AttributeConsumingService.ServiceName;
	if (entity.organizations && entity.organizations[0] && entity.organizations[0].OrganizationDisplayName) {
		return entity.organizations[0].OrganizationDisplayName;
	}
	
	
	return null;
}

function getDescr(entity) {
	if (entity.mdui && entity.mdui.Description) 
		return entity.mdui.Description;
	if (entity.AttributeConsumingService && entity.AttributeConsumingService.ServiceDescription) 
		return entity.AttributeConsumingService.ServiceDescription;
	return null;
}


function getSPSSODescriptor(entity, element) {
	
	var 		
		i,
		childNodes,
		currentChild
		;
	
		// Results stored in
		entity.SPSSODescriptor = {};

		if (!checkNode(element, 'SPSSODescriptor', constants.ns.md)) {
			throw {'name': 'SPSSODescriptor in getSAML2SP() not was not recognized as a node in correct namespace.'};
		}

		childNodes = element.childNodes();

		for (var i = 0; i < childNodes.length; i++ ) {

			currentChild = childNodes[i];
			switch(currentChild.name()) {

				case 'Extensions':
					getExtensionsSPSSODescriptorLevel(entity, currentChild);
					break;						

				case 'KeyDescriptor':
					getKeyDescriptor(entity, currentChild);
					break;

				case 'SingleLogoutService': 
					if (!entity.SPSSODescriptor.SingleLogoutService) entity.SPSSODescriptor.SingleLogoutService = [];
					entity.SPSSODescriptor.SingleLogoutService.push(parseEndpoint(currentChild));
					break;

				case 'AssertionConsumerService': 
					if (!entity.SPSSODescriptor.AssertionConsumerService) entity.SPSSODescriptor.AssertionConsumerService = [];
					entity.SPSSODescriptor.AssertionConsumerService.push(parseEndpoint(currentChild));
					break;

				case 'ArtifactResolutionService':
				case 'ManageNameIDService':
					break;


				case 'AttributeConsumingService':
					getAttributeConsumingService(entity, currentChild);
					break;
				
				case 'NameIDFormat': 
					entity.status.push({status: 3, title: 'Parsing NameIDFormat not yet implemented'});
					break;

				
				case 'text':
					break;
				
				default:
					entity.status.push({status: 2, title: 'Found unknown child element of SPSSODescriptor [' + currentChild.name() + ']'});
					// alert('Unknown child of root: ' + currentChild.name());

			}

		}
	
	
}




function getKeyDescriptor(entity, element) {
	var 
		cert, use,
		
		keyinfo, x509data, x509cert;
	
	if (!checkNode(element, 'KeyDescriptor', constants.ns.md)) {
		throw 'KeyDescriptor in getKeyDescriptor() not was not recognized as a node in correct namespace.';
	}

	use = getAttribute(element, 'use', 'both');

	keyinfo = findChildElement(element, 
		[{'localName': 'KeyInfo', 'namespaceURI': constants.ns.ds}]);
	if (!keyinfo) return;

	x509data = findChildElement(keyinfo, 
		[{'localName': 'X509Data', 'namespaceURI': constants.ns.ds}]);
	if (!x509data) return;

	x509cert = findChildElement(x509data, 
		[{'localName': 'X509Certificate', 'namespaceURI': constants.ns.ds}]);
	if (!x509cert) return;

	cert = getText(x509cert);
	if (!cert) return;

	// We got what we want, now store in result object.

	if(!entity.certs) entity.certs = [];
	entity.certs.push({'use': use, 'cert': cert});
	
	
}




function getExtensionsEntityLevel (entity, element) {

	var 
		currentChild,
		childNodes,
		i;

	if (!checkNode(element, 'Extensions', constants.ns.md)) {
		throw {'name': 'Extensions in getExtensionsEntityLevel() not was not recognized as a node in correct namespace.'};
	}

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		
		if (isSAMLnamespace(currentChild)) {
			entity.status.push({status: 0, title: 'Found child element in Extension in a SAML namespace, which is not allowed. [' + currentChild.name() + ']'});
			continue;
		}
		
		if (checkNode(currentChild, 'EntityAttributes', constants.ns.mdattr)) {

			parseEntityAttributes(entity, currentChild);
		
		} else if (checkNode(currentChild, 'UIInfo', constants.ns.mdui)) {
		
			entity.status.push({status: 0, title: 'Found MDUI element in Extension on entity level. This extension MUST be placed within the Extensions of a role descriptor.'});
		
			// getMDUI(entity, currentChild);

		
		} else if (currentChild.name() !== 'text') {
			
			entity.status.push({status: 2, title: 'Found unknown Extension (entity level) element [' + currentChild.name() + ']'});
		
		}


	}

}


function isSAMLnamespace(element) {
	if (element.name() === 'text') return false;
	if (element.namespace().href() === constants.ns.md) return true;
	if (element.namespace().href() === constants.ns.saml) return true;
	return false;
}

function getExtensionsSPSSODescriptorLevel (entity, element) {

	var 
		currentChild,
		childNodes,
		i;

	if (!checkNode(element, 'Extensions', constants.ns.md)) {
		throw {'name': 'Extensions in getExtensionsSPSSODescriptorLevel() not was not recognized as a node in correct namespace.'};
	}

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		
		if (isSAMLnamespace(currentChild)) {
			entity.status.push({status: 0, title: 'Found child element in Extension in a SAML namespace, which is not allowed. [' + currentChild.name() + ']'});
			continue;
		}
		
		if (checkNode(currentChild, 'EntityAttributes', constants.ns.mdattr)) {

			entity.status.push({status: 0, title: 'Found EntityAttributes element in Extension on a role descriptor level. This extension MUST be placed within the Extensions at entity level.'});
		
		} else if (checkNode(currentChild, 'DiscoveryResponse', constants.ns.idpdisc)) {
		
			entity.status.push({status: 3, title: 'Parsing DiscoveryResponse not yet implemented'});
		

		} else if (currentChild.name() === 'DiscoveryResponse') {
			
			entity.status.push({status: 0, title: 'Found DiscoveryResponse element in wrong namespace. Correct namespace is [' + constants.ns.idpdisc + ']'});

		} else if (checkNode(currentChild, 'UIInfo', constants.ns.mdui)) {
		
			getMDUI(entity, currentChild);

		} else if (currentChild.name() === 'UIInfo') {
			
			entity.status.push({status: 0, title: 'Found MDUI element in wrong namespace. Correct namespace is [' + constants.ns.mdui + ']'});
			
		} else if (currentChild.name() !== 'text') {
			
			entity.status.push({status: 2, title: 'Found unknown Extension (SP roledescriptor) element [' + currentChild.name() + ']'});
		
		}


	}

}




function getMDUI (entity, element) {

	var 
		currentChild,
		childNodes,
		i;
	
	if (!checkNode(element, 'UIInfo', constants.ns.mdui)) {
		throw {'name': 'UIInfo in parseMDUI() not was not recognized as a node in correct namespace.'};
	}

	entity.mdui = {};

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];

		var lang = getAttribute(currentChild, 'xml:lang', 'en');

		switch(currentChild.name()) {

			case 'DisplayName': 
				if (!entity.mdui.DisplayName) entity.mdui.DisplayName = {};
				entity.mdui.DisplayName[lang] = getText(currentChild);
				break;

			case 'Description': 
				if (!entity.mdui.Description) entity.mdui.Description = {};
				entity.mdui.Description[lang] = getText(currentChild);
				break;

			case 'GeolocationHint': 
				if (!entity.mdui.GeolocationHint) entity.mdui.GeolocationHint = [];
				entity.mdui.GeolocationHint.push(getText(currentChild).substr(4));
				break;

			case 'text':
				break;

			default:
				entity.status.push({status: 2, title: 'Found unknown MDUI element [' + currentChild.name() + ']'});
				// alert('Unknown child of root: ' + currentChild.name());

		}

	}

}


function getEntityAttributes (entity, element) {

	var 
		currentChild,
		childNodes,
		i;

	if (!checkNode(element, 'EntityAttributes', constants.ns.mdattr)) {
		throw {'name': 'EntityAttributes in parseEntityAttributes() not was not recognized as a node in correct namespace.'};
	}

	entity.EntityAttributes = {};
	
	childNodes = element.childNodes();

	// Iterate the children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];

		if (currentChild.name() === 'text' || 
			currentChild.namespace().href() !== constants.ns.saml) {
			
			console.log('Ignoring element in EntityAttributs extension that is not SAML namespace');
			
			entity.status.push({status: 3, title: 'Ignoring element in EntityAttributs extension that is not SAML namespace: <' + currentChild.name() + '>'});
			continue;
		}

		switch(currentChild.name()) {
			case 'Attribute': 
				var newAttr = parseAttribute(currentChild);
				if (newAttr.name) entity.entityAttributes[newAttr.name] = newAttr;

				break;

			case 'Assertion': 						
			default:
				// alert('Unknown child of root: ' + currentChild.name());

		}				
	}

}



function getAttributeConsumingService(entity, element) {

	var 
		currentChild,
		childNodes,
		i,
		
		foundElements = {};
	
	if (!checkNode(element, 'AttributeConsumingService', constants.ns.md)) {
		throw {'name': 'AttributeConsumingService in getAttributeConsumingService() not was not recognized as a node in correct namespace.'};
	}

// 	if (!resultObject.name) resultObject.name = {};
// 	if (!resultObject.descr) resultObject.descr = {};
// 	resultObject.attributes = {};

	entity.AttributeConsumingService = {};

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];

		var lang = getAttribute(currentChild, 'xml:lang', 'en');
		foundElements[currentChild.name()] = 1;

		switch(currentChild.name()) {

			case 'ServiceName': 
				if (!entity.AttributeConsumingService.ServiceName) entity.AttributeConsumingService.ServiceName = {}; 
				entity.AttributeConsumingService.ServiceName[lang] = getText(currentChild);
				break;

			case 'ServiceDescription': 
				if (!entity.AttributeConsumingService.ServiceDescription) entity.AttributeConsumingService.ServiceDescription = {}; 
				entity.AttributeConsumingService.ServiceDescription[lang] = getText(currentChild);
				break;

			case 'RequestedAttribute': 
				if (!entity.AttributeConsumingService.attributes) entity.AttributeConsumingService.attributes = []; 
				
				var attrname = getAttribute(currentChild, 'Name', null);
				if (attrname) {
					entity.AttributeConsumingService.attributes.push(attrname);
				}
				break;
			
			case 'text':
				break;

			default:
				entity.status.push({status: 2, title: 'Found unknown AttributeConsumingService child element [' + currentChild.name() + ']'});

		}

	}
	
	if (!foundElements.ServiceName) {
		entity.status.push({status: 0, title: 'AttributeConsumingService element present without a required ServiceName'});
	}

	if (!foundElements.ServiceDescription) {
		entity.status.push({status: 0, title: 'AttributeConsumingService element present without a required ServiceDescription'});
	}
	
	
	
}



function getOrganization(entity, element) {

	var 
		currentChild,
		childNodes,
		i,
		
		lang,
		organization = {};

	if (!checkNode(element, 'Organization', constants.ns.md)) {
		throw {'name': 'Organization in getOrganization() not was not recognized as a node in correct namespace.'};
	}

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];

		switch(currentChild.name()) {

			case 'OrganizationName': 
				lang = getAttribute(currentChild, 'xml:lang', 'en');
				if (!organization.OrganizationName) organization.OrganizationName = {};
				organization.OrganizationName[lang] = getText(currentChild);
				break;

			case 'OrganizationDisplayName': 
				lang = getAttribute(currentChild, 'xml:lang', 'en');
				if (!organization.OrganizationDisplayName) organization.OrganizationDisplayName = {};
				organization.OrganizationDisplayName[lang] = getText(currentChild);
				break;

			case 'OrganizationURL':
				lang = getAttribute(currentChild, 'xml:lang', 'en');
				if (!organization.OrganizationURL) organization.OrganizationURL = {};
				organization.OrganizationURL[lang] = getText(currentChild);
				break;

			case 'Extensions':
				entity.status.push({status: 3, title: 'Parsing of this element (inside Organization), not yet implemented [' + currentChild.name() + ']'});
				break;

			case 'text':
				break;

			default:
				entity.status.push({status: 2, title: 'Found unknown child element in Organization [' + currentChild.name() + ']'});

		}

	}

	if (!entity.organizations) {
		entity.organizations = [];
	}
// 	console.log(' - - - - - - - - - - adding org');
// 	console.log(organization);
	
	entity.organizations.push(organization);
	

}


function getContactPerson(entity, element) {
	
	var 
		currentChild,
		childNodes,
		i;

	if (!checkNode(element, 'ContactPerson', constants.ns.md)) {

		debugElement(element);
//		throw {'name': 'ContactPerson in parseContactPerson() not was not recognized as a node in correct namespace.'};
//		console.log('ContactPerson in parseContactPerson() not was not recognized as a node in correct namespace.');
		entity.status.push({status: 0, title: 'ContactPerson in was not recognized as a node in correct namespace: ' + element.name()});
		return;
	}

	var newContact = {};
	newContact.contactType = getAttribute(element, 'contactType', null);
	
	if (newContact.contactType === null) {
		entity.status.push({status: 0, title: 'Contacttype required for ContactPerson, but was missing.'});
		return;
	}

	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];

		switch(currentChild.name()) {

			case 'GivenName': 
				newContact.GivenName = getText(currentChild);
				break;

			case 'SurName': 
				newContact.SurName = getText(currentChild);
				break;

			case 'EmailAddress':
				newContact.EmailAddress = getText(currentChild);
				break;

			case 'Extensions':
			case 'Company':
			case 'TelephoneNumber':
				entity.status.push({status: 3, title: 'Parsing of this element (inside ContactPerson), not yet implemented [' + currentChild.name() + ']'});
				break;

			case 'text':
				break;

			default:
				entity.status.push({status: 2, title: 'Found unknown child element in ContactPerson [' + currentChild.name() + ']'});

		}

	}

	if (!entity.contacts) {
		entity.contacts = [];
	}
	entity.contacts.push(newContact);
	
}












function parseEndpoint(endpoint) {

	var res = {};
	
	res.Binding = getAttribute(endpoint, 'Binding', null);
	res.Location = getAttribute(endpoint, 'Location', null);
	res.ResponseLocation = getAttribute(endpoint, 'ResponseLocation', null);
	res.index = getAttribute(endpoint, 'index', null);
	
	return res;

}


function parseAttribute (element) {

	var 
		currentChild,
		childNodes,
		i;

	if (!checkNode(element, 'Attribute', constants.ns.saml)) {
		throw {'name': 'Attribute in parseAttribute() not was not recognized as a node in correct namespace.'};
	}

	var newAttr = {};
	newAttr.name = getAttribute(element, 'Name', null);
	newAttr.nameFormat = getAttribute(element, 'NameFormat', null);

	var values = [];
	
	childNodes = element.childNodes();
	
	// Iterate the root children
	for (i = 0; i < childNodes.length; i++ ) {
		currentChild = childNodes[i];
		
		if (!checkNode(currentChild, 'AttributeValue', constants.ns.saml)) continue;

		values.push(getText(currentChild));
	}
	newAttr.values = values;
	return newAttr;
}




// Parse from string.
parseFromString = function(xmlstring) {

	var 
		parser,
		doc,
		root,
			
		resultObject = {};

	doc = libxmljs.parseXmlString(xmlstring);
	root = doc.document().root();
	
	return getEntitiesDescriptor(doc.document().root());
}








exports.parseFromString = parseFromString;
