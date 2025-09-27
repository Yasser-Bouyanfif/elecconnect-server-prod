import type { Schema, Struct } from '@strapi/strapi';

export interface CommonAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_addresses';
  info: {
    displayName: 'address';
    icon: 'house';
  };
  attributes: {
    address1: Schema.Attribute.String;
    address2: Schema.Attribute.String;
    city: Schema.Attribute.String;
    company: Schema.Attribute.String;
    country: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    phone: Schema.Attribute.BigInteger;
    postalCode: Schema.Attribute.Integer;
  };
}

export interface CommonProductSection extends Struct.ComponentSchema {
  collectionName: 'components_common_product_sections';
  info: {
    displayName: 'productSection';
    icon: 'information';
  };
  attributes: {
    content: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface CommonShipping extends Struct.ComponentSchema {
  collectionName: 'components_common_shippings';
  info: {
    displayName: 'shipping';
    icon: 'car';
  };
  attributes: {
    carrier: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Colissimo Standard (2 \u00E0 3 jours ouvr\u00E9s)'>;
    price: Schema.Attribute.Decimal;
  };
}

export interface ProductTechnicalSpecificationsAndBenefits
  extends Struct.ComponentSchema {
  collectionName: 'components_product_technical_specifications_and_benefits';
  info: {
    displayName: 'technicalSpecifications_and_Benefits';
    icon: 'information';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.address': CommonAddress;
      'common.product-section': CommonProductSection;
      'common.shipping': CommonShipping;
      'product.technical-specifications-and-benefits': ProductTechnicalSpecificationsAndBenefits;
    }
  }
}
